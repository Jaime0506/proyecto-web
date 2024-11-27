import { supabase } from "../../supabase/supabase";
import { FormType } from "../../types/authForms";
import { AppDispatch } from "../store";
import { checking, login, logout, setError } from "./authSlice";
import { attendance, subjects, tasks as setTasks } from "../data/dataSlice";
import { UserType, TaskData } from "../../types/redux";
import { uploadFile } from "../../utils/uploadFiles";
import { toast } from "react-toastify";

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

export const handleOnSubmitAttendance = (
  p_subject_id: string,
  p_user_id: string,
  p_status: string,
  p_date: string
) => {
  return async () => {
    const { data, error } = await supabase
      .schema("gr7")
      .rpc("update_attendance_metadata", {
        p_subject_id,
        p_user_id,
        p_status,
        p_date,
      });
    console.log(data, error);
  };
};

export const handleOnGetName = async  (user_id: string) => {
  const { data } = await supabase
    .schema("gr7")
    .rpc("get_user_profile", { user_id });
  return data.name;
}

export const handleOnCreateTask = (taskData: TaskData, user:any, subject_id: any) => {
  return async (dispatch: AppDispatch) => {
    const { title, description, dueDate } = taskData;

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
          create_by: user,
          subject_id, 
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

export const handleUploadTaskSubmission = (submissionData: {
  taskId: string;
  delivery: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { taskId, delivery } = submissionData;
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .update({
          delivery,
        })
        .eq("task_id", taskId);

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

export const handleUploadFeedBack = (submissionData: {
  taskId: string;
  grade: number;
  feedback: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { taskId, grade, feedback } = submissionData;

      // Realiza el insert sin el campo file_id
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .update({
          grade,
          feedback,
        })
        .eq("task_id", taskId);

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
export const handleDeleteTask = (taskId: string, create_by: any, subject_id: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Elimina las entregas asociadas si es necesario
      const { error: deleteSubmissionsError } = await supabase
        .schema("gr7")
        .from("task")
        .delete()
        .eq("task_id", taskId);

      if (deleteSubmissionsError) {
        console.error(
          "Error al eliminar las entregas asociadas:",
          deleteSubmissionsError
        );
        throw deleteSubmissionsError;
      }

      // Luego, elimina la tarea
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .delete()
        .eq("task_id", taskId);

      if (error) {
        console.error("Error al eliminar la tarea en Supabase:", error);
        throw error;
      }

      // Actualiza el estado si es necesario
      dispatch({ type: "DELETE_TASK_SUCCESS" });
      dispatch(handleOnGetTasks(create_by, subject_id));
    } catch (error) {
      console.error("Error inesperado al eliminar la tarea:", error);
      dispatch({ type: "DELETE_TASK_FAILURE", error });
    }
  };
};

export const handleUpdateTask = (taskId: string, updatedData: TaskData, create_by: any, subject_id: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Lógica para actualizar la tarea usando updatedData
      const { error } = await supabase
        .schema("gr7")
        .from("task")
        .update({
          title: updatedData.title,
          description: updatedData.description,
          due_date: updatedData.dueDate, // Cambia de due_date a dueDate
        })
        .eq("task_id", taskId);

      if (error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
      }

      // Actualiza el estado de Redux si es necesario
      dispatch({ type: "UPDATE_TASK_SUCCESS" });

      // Actualiza las tareas (si es necesario)
      dispatch(handleOnGetTasks(create_by, subject_id));
    } catch (error) {
      console.error("Error inesperado al actualizar la tarea:", error);
      dispatch({ type: "UPDATE_TASK_FAILURE", error });
    }
  };
};

export const handleGetTaskDocent = (subject_id: any) => {
  return async (dispatch: AppDispatch) => {
    const { data, error } = await supabase
      .schema("gr7")
      .from("task")
      .select()
      .eq("subject_id", subject_id);
    console.log(data, error);

    if (error) {
      console.error("Error loading tasks:", error);
      return []; // Retorna un array vacío en caso de error
    }
    
    dispatch(setTasks(data)); 
  }
}

export const handleOnGetTasks = (created_by: any, subject:any) => {
  return async (dispatch: AppDispatch) => {
    const { data, error } = await supabase
      .schema("gr7")
      .rpc('get_tasks_by_user', {created_by, subject})

    if (error) {
      console.error("Error loading tasks:", error);
      return []; // Retorna un array vacío en caso de error
    }

    dispatch(setTasks(data)); 
    return data; 
  };
};

export const handleOnCheckingCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { data } = await supabase.auth.getUser();

    const { data: user_subjects } = await supabase
      .schema("gr7")
      .rpc("get_subjects_by_user", {
        usersub: data.user?.id,
      });

    dispatch(subjects(user_subjects));

    if (!data.user) {
      dispatch(logout(null));

      return;
    }

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: data.user.email,
      role: data.user.user_metadata.role,
      photoURL: data.user.user_metadata.photoURL,
    };

    dispatch(login(userLoged));
  };
};

export const handleOnLogin = (user: FormType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checking());

    const { data, error } = await supabase.auth.signInWithPassword(user);

    const { data: user_subjects } = await supabase
      .schema("gr7")
      .rpc("get_subjects_by_user", {
        usersub: data.user?.id,
      });

    dispatch(subjects(user_subjects));

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
      photoURL: data.user.user_metadata.photoURL,
    };

    dispatch(login(userLoged));
  };
};

export const handleOnAdminLogin = (user: FormType)=>{
  return async (dispatch: AppDispatch)=> {
    dispatch(checking());
    
    const {data, error} = await supabase.auth.signInWithPassword(user);

    if(error){
      console.log(error);
      dispatch(logout(error));
      return;
    }
    if(!data.user){
      dispatch(logout(null));
      return;
    }

    const role = data.user.user_metadata.role;
    if(role !== "admin"){
      console.log("Este usuario no es administrador");
      dispatch(logout(error));
      return;
    }

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name: null,
      email: user.email,
      role: data.user.user_metadata.role ? data.user.user_metadata.role: 'student',
      photoURL: data.user.user_metadata.photoURL,
    };

    dispatch(login(userLoged));
    console.log("Inicio de sesión exitoso para administrativo.");
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
      photoURL: null,
    };

    dispatch(login(userLoged));

    toast.success('Todos los cambios guardados con exito', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'light'
    })
  };
};

export const handleOnUploadPhoto = (file: File, user: UserType) => {
  return async (dispatch: AppDispatch) => {
    const response = await uploadFile(file, user?.id);

    if (response?.error) {
      dispatch(setError(response.error));

      return
    }

    if (!response?.publicURL) {
      console.log("Error uwu")

      return
    }

    const { data } = await supabase.auth.updateUser({
      data: {
        photoURL: response?.publicURL
      }
    })

    if (!data.user) return

    const userLoged: UserType = {
      id: data.user.id,
      name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
      email: data.user.email,
      role: data.user.user_metadata.role,
      is_super_admin: data.user.user_metadata.is_super_admin || false, // Añadir esta propiedad
      photoURL: response?.publicURL ? response.publicURL : null,
    };

    dispatch(login(userLoged))

    toast.success('Todos los cambios guardados con exito', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'light'
    })
  };
};
