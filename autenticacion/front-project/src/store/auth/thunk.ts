import { supabase } from "../../supabase/supabase";
import { FormType, FormTypeA } from "../../types/authForms";
import { AppDispatch } from "../store";
import { checking, login, logout, setError } from "./authSlice";
import { attendance, subjects, tasks as setTasks } from "../data/dataSlice";
import { UserType, TaskData } from "../../types/redux";
import { uploadFile } from "../../utils/uploadFiles";

export const handleOnGetAttendance = (subject_id: string) => {
  return async (dispatch: AppDispatch) => {
    const { data, error } = await supabase
      .schema("gr7")
      .from("attendance")
      .select()
      .eq("subject_id", subject_id);
    console.log(data, error);

    dispatch(attendance(data));
  };
};

export const handleOnSubmitAttendance = (p_subject_id: string, p_user_id: string, p_status: string, p_date: string) => {
  return async () => {
    const { data, error } = await supabase
      .schema("gr7")
      .rpc("update_attendance_metadata", {
        p_subject_id,
        p_user_id,
        p_status,
        p_date
      });
    console.log(data, error);
  }
}

export const handleOnGetName = async(user_id: string) => {
  const { data } = await supabase
    .schema("gr7")
    .rpc("get_user_profile", {user_id});
    return data.name;
}

export const handleOnCreateTask = (taskData: TaskData) => {
  return async (dispatch: AppDispatch) => {
    const { title, description, dueDate, create_by, subject_id } = taskData;

    // Inserción de la tarea en la base de datos de Supabase
    const { data, error } = await supabase
      .schema("gr7")
      .from("task")
      .insert([
        {
          title,
          description,
          due_date: dueDate,
          created_at: new Date(),
          create_by, // Usamos el ID del usuario autenticado
          subject_id, // Usamos el ID de la asignatura
        },
      ]);

    if (error) {
      console.log("Error al crear tarea:", error);
      return; // Salimos si ocurre un error
    }

    if (!data) {
      console.log("No se recibió ninguna tarea después de la inserción.");
      return; // Salimos si 'data' es null o undefined
    }

    console.log("Tarea creada:", data);

    // Despachar la acción 'setTasks' solo si data no es null
    dispatch(setTasks(data)); // Actualiza el estado de Redux con la nueva tarea
  };
};

export const handleUploadTaskSubmission = (submissionData: { taskId: string; delivery: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { taskId, delivery } = submissionData;
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .update({
          delivery,
        }).eq('task_id', taskId);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error al subir la tarea:", error);
      dispatch({ type: "UPLOAD_TASK_SUBMISSION_FAILURE", error });
    }
  };
};

export const handleUploadFeedBack = (submissionData: { taskId: string, grade: number, feedback:string }) => {
    return async (dispatch: AppDispatch) => {
      try {
        const { taskId,grade,feedback } = submissionData;

        // Realiza el insert sin el campo file_id
        const { error } = await supabase
          .schema("gr7")
          .from("task")
          .update({
            grade,feedback
          }).eq('task_id', taskId);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
      } catch (error) {
        console.error("Error al subir la retroalimentacion: ", error);
        dispatch({ type: "UPLOAD_TASK_SUBMISSION_FAILURE", error });
      }
    };
};

export const handleDeleteTask = (taskId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Elimina las entregas asociadas a la tarea, si existen
      const { error: deleteSubmissionsError } = await supabase
        .schema("gr7")
        .from("task")  // Suponiendo que la tabla de entregas es "task_submission"
        .delete()
        .eq("task_id", taskId);

      if (deleteSubmissionsError) {
        console.error("Error al eliminar las entregas asociadas:", deleteSubmissionsError);
        throw deleteSubmissionsError;
      }

      // Luego, elimina la tarea
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .delete()
        .eq('task_id', taskId);

      if (error) {
        console.error("Error al eliminar la tarea en Supabase:", error);
        throw error;
      }

      // Si la eliminación fue exitosa, actualiza el estado con las tareas restantes
      dispatch({ type: "DELETE_TASK_SUCCESS" });

      // Actualiza la lista de tareas
      dispatch(handleOnGetTasks());

    } catch (error) {
      console.error("Error inesperado al eliminar la tarea:", error);
      dispatch({ type: "DELETE_TASK_FAILURE", error });
    }
  };
};


export const handleOnGetTasks = () => {
  return async (dispatch: AppDispatch) => {
    const { data, error } = await supabase
      .schema("gr7")
      .from("task")
      .select("*");

    if (error) {
      console.error("Error loading tasks:", error);
      return []; // Retorna un array vacío en caso de error
    }

    // Despacha las tareas al estado de Redux
    dispatch(setTasks(data)); // Asegúrate de que 'setTasks' esté correctamente definido en tu dataSlice
    return data; // Retorna los datos para que se puedan usar si es necesario
  };
};

export const handleOnCheckingCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { data } = await supabase.auth.getUser();

    const { data: tableSubjects } = await supabase
      .schema("gr7")
      .from("subjects")
      .select();
    dispatch(subjects(tableSubjects));

    if (!data.user) {
      dispatch(logout(null));

      return;
    }

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: data.user.email,
      role: data.user.user_metadata.role,
      is_super_admin: data.user.user_metadata.is_super_admin || false, // Añadir esta propiedad
      photoURL: data.user.user_metadata.photoURL,
    };

    dispatch(login(userLoged));
  };
};

export const handleOnLogin = (user: FormType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { data, error } = await supabase.auth.signInWithPassword(user);

    if (error) {
      console.log(error);
      dispatch(logout(error));
      return;
    }

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: user.email,
      role: data.user.user_metadata.role,
      is_super_admin: data.user.user_metadata.is_super_admin || true, // Validamos aquí
      photoURL: data.user.user_metadata.photoURL,
    };

    dispatch(login(userLoged));
    console.log(userLoged.is_super_admin)
  };
};


export const handleOnRegister = (user: FormType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          name: null,
          photoURL: null,
          is_super_admin: true, // Aquí defines si el usuario es admin
        },
      },
    });

    if (error) {
      console.log(error);
      dispatch(logout(error));

      return;
    }

    if (!data.user) return;

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: user.email,
      role: data.user.user_metadata.role,
      is_super_admin: data.user.user_metadata.is_super_admin || false, // Traemos este valor
      photoURL: null,
    };

    dispatch(login(userLoged));
  };
};

export const handleOnLogout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      dispatch(logout(error));

      return;
    }

    dispatch(logout(null));
  };
};

export const handleOnSetName = (name: string) => {
  return async (dispatch: AppDispatch) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name,
      },
    });

    if (error) {
      dispatch(setError(error));
    }

    if (!data.user) return;

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: data.user.email,
      role: data.user.user_metadata.role,
      is_super_admin: data.user.user_metadata.is_super_admin || false, // Añadir esta propiedad
      photoURL: null,
    };

    dispatch(login(userLoged));
  };
};

export const handleOnUploadPhoto = (file: File, user: UserType) => {
  return async (dispatch: AppDispatch) => {
    const resposne = await uploadFile(file, user?.id);

    //const errorMod = {...resposne?.error}

    if (resposne?.error) {
      dispatch(setError(resposne.error));
    }
  };
};

export const handleOnLoginAdmin = (user: FormTypeA) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    // Intentar iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword(user);

    if (error) {
      console.log(error);
      dispatch(logout(null));

      return;
    }

    // Si el inicio de sesión es exitoso, verificar si el usuario está en la tabla "administrativo"
    const { data: adminData, error: adminError } = await supabase
      .schema("public")
      .from("administrativo")
      .select()
      .eq("user_id", data.user.id)
      .single(); // single() asegura que solo se espera un resultado

    if (adminError || !adminData) {
      console.log("No es un administrador o hubo un error:", adminError);
      dispatch(logout(null));

      return;
    }

    // Crear el objeto del usuario administrador logueado
    const userLoged = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: data.user.email,
      photoURL: null,
      is_super_admin: data.user.user_metadata.is_super_admin || false, // Añadir esta propiedad
      role: "admin", // Asignar un rol específico para administradores
    };

    dispatch(login(userLoged));
  };
};
