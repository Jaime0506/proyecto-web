import { supabase } from "../../supabase/supabase";
import { FormType } from "../../types/authForms";
import { AppDispatch } from "../store";
import { checking, login, logout, setError } from "./authSlice";
import { attendance, subjects, tasks as setTasks } from "../data/dataSlice";
import { UserType } from "../../types/redux";
import { uploadFile } from "../../utils/uploadFiles";
import { createAsyncThunk } from "@reduxjs/toolkit";



type TaskData = {
    title: string;
    description: string;
    dueDate: string;
};

export const handleOnGetAttendance = (subject_id: string) => {
    return async (dispatch: AppDispatch) => {
        const { data, error } = await supabase
            .schema("gr7")
            .from("attendance")
            .select()
            .eq("subject_id", subject_id);
        console.log(data, error);

        dispatch(attendance(data));

        const { data: funcData, error: funcError } = await supabase.schema("gr7").rpc(
            "update_attendance",
            {
                p_subject_id: "6a4d43dc-d4b0-4ebc-94e9-a6bee2394cac",
                p_user_id: "09cb613a-71df-4620-b067-edafb833fab9",
            }
        );
        console.log(funcData, funcError);
    };
};

export const handleOnCreateTask = (taskData: TaskData) => {
    return async () => {
      const { title, description, dueDate } = taskData;
  
      const { data, error } = await supabase
        .schema("gr7")
        .from("task")
        .insert([
          {
            title,
            description,
            due_date: dueDate,
            created_at: new Date(),
            create_by: "uuid_del_usuario", // Reemplaza con el ID del usuario
            subject_id: "uuid_de_asignatura", // Reemplaza con el ID de la asignatura
          },
        ]);
  
      if (error) {
        console.log("Error al crear tarea:", error);
        return;
      }
  
      console.log("Tarea creada:", data);
    };
  };


export const handleOnGetTasks = createAsyncThunk(
    'data/getTasks',
    async (_, { dispatch }) => {
        const { data, error } = await supabase
            .schema("gr7")
            .from("task")
            .select('*');

        if (error) {
            console.error("Error loading tasks:", error);
            return []; // Retorna un array vacío en caso de error
        }

        // Despacha las tareas al estado de Redux
        dispatch(setTasks(data)); // Asegúrate de que 'setTasks' esté correctamente definido en tu dataSlice
        return data; // Retorna los datos para que se puedan usar si es necesario
    }
);


export const handleOnCheckingCurrentUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking());

        const { data } = await supabase.auth.getUser();

        const { data: tableSubjects, error } = await supabase
            .schema("gr7")
            .from("subjects")
            .select();
        console.log(tableSubjects, error);
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
            photoURL: data.user.user_metadata.photoURL
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
            photoURL: data.user.user_metadata.photoURL
        };

        dispatch(login(userLoged));
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
                    photoURL: null
                }
            }
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
            photoURL: null
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
            }
        })

        if (error) {
            dispatch(setError(error))
        }

        if (!data.user) return;

        const userLoged: UserType = {
            id: data.user.id,
            name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
            email: data.user.email,
            role: data.user.user_metadata.role,
            photoURL: null
        };

        dispatch(login(userLoged))
    }
}

export const handleOnUploadPhoto = (file: File, user: UserType) => {
    return async (dispatch: AppDispatch) => {
        const resposne = await uploadFile(file, user?.id);

        //const errorMod = {...resposne?.error}



        if (resposne?.error) {
            dispatch(setError(resposne.error))
        }
    }
}