import { handleOnCheckingCurrentUser, handleOnLogin, handleOnLogout, handleOnRegister, handleOnSetName } from "../store/auth/thunk"
import { FormType } from "../types/authForms"

import { useAppDispatch, useAppSelector } from "./useStore"

export const useAuth = () => {

    const { user } = useAppSelector(state => state.auth)
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

    const onSetName = (name: string) => {
        dispatch(handleOnSetName(name))
    }

    return {
        user,

        onLogin,
        onRegister,
        onLogout,
        onCheckingCurrentUser,
        onSetName
    }
}