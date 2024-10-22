import { checking, logout } from "../store/auth/authSlice"
import { handleOnLogin } from "../store/auth/thunk"
import { FormType } from "../types/authForms"

import { useAppDispatch, useAppSelector } from "./useStore"

export const useAuth = () => {

    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const onCheckin = () => {
        dispatch(checking())
        
        // Validation if the user is authenticated
        setTimeout(() => {
            // dispatch()
        }, 1000)
    }
    
    const onLogin = (user: FormType) => {
        dispatch(handleOnLogin(user))
    }

    const onLogout = () => {
        dispatch(checking())

        setTimeout(() => {

            console.log("Emote")

            dispatch(logout())
        }, 1500)
    }

    return {
        user,

        onLogin,
        onLogout,
        onCheckin
    }
}