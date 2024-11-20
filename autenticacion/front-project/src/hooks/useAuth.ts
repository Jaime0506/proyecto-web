import { handleOnCheckingCurrentUser, handleOnLogin, handleOnLogout, handleOnRegister, handleOnLoginAdmin } from "../store/auth/thunk"
import { FormType,FormTypeA } from "../types/authForms"

import { useAppDispatch, useAppSelector } from "./useStore"

export const useAuth = () => {

    const { user } = useAppSelector(state => state.auth)
    //const { admi } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const onCheckingCurrentUser = () => {
        dispatch(handleOnCheckingCurrentUser())
    }
    
    const onLogin = (user: FormType) => {
        dispatch(handleOnLogin(user))
    }

    const onRegister = (user: FormType) => {
        dispatch(handleOnRegister(user))
    }

    const onLogout = () => {
        dispatch(handleOnLogout())
    }
    const onAdmi = (admi: FormTypeA) => {
        dispatch(handleOnLoginAdmin(admi))
    }

    return {
        user,

        onLogin,
        onRegister,
        onLogout,
        onCheckingCurrentUser,
        onAdmi
    }
}