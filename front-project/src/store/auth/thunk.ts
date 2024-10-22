import { supabase } from "../../supabase/supabase"
import { FormType } from "../../types/authForms"
import { AppDispatch } from "../store"
import { checking, login, logout } from "./authSlice"

export const handleOnLogin = (user: FormType) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checking())

        const { data, error } = await supabase.auth.signInWithPassword(user)

        if (error) {
            console.log(error)
            dispatch(logout())

            return
        }
        
        const userLoged = {
            id: data.user.id,
            name: data.user.user_metadata.name ? data.user.user_metadata.name : null,
            email: user.email
        }
        
        console.log(data)

        dispatch(login(userLoged))
    }
}