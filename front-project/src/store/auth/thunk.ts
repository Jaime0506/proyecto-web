import { supabase } from "../../supabase/supabase";
import { FormType } from "../../types/authForms";
import { AppDispatch } from "../store";
import { checking, login, logout } from "./authSlice";
import { subjects } from "../data/dataSlice";
import { UserType } from "../../types/redux";

export const handleOnCheckingCurrentUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { data } = await supabase.auth.getUser()

        const { data: tableData } = await supabase.schema('gr7').from('subjects').select()
    

        dispatch(subjects(tableData))

        if (!data.user) {
            dispatch(logout())

            return
        } 

        const userLoged:UserType = {
            id: data.user.id,
            name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
            email: data.user.email,
            role: data.user.role,
        };

        dispatch(login(userLoged))
    }
}

export const handleOnLogin = (user: FormType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking());

        const { data, error } = await supabase.auth.signInWithPassword(user);
        
        if (error) {
            console.log(error);
            dispatch(logout());

            return;
        }

        const userLoged = {
            id: data.user.id,
            name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
            email: user.email,
            role: data.user.role,
        };


        dispatch(login(userLoged));
    };
};

export const handleOnRegister = (user: FormType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        })

        if (error) {
            console.log(error)
            dispatch(logout())

            return
        }
        
        if (!data.user) return

        const userLoged = {
            id: data.user.id,
            name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
            email: user.email,
            role: data.user.role,
        };

        dispatch(login(userLoged))
    }
}

export const handleOnLogout = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking());

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            dispatch(logout());

            return;
        }

        dispatch(logout());
    };
};