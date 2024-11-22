import { handleOnCheckingCurrentUser, handleOnLogin, handleOnLogout, handleOnRegister, handleOnSetName, handleOnUploadPhoto } from "../store/auth/thunk"
import { FormType } from "../types/authForms"
import { UserType } from "../types/redux"

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

    const onSetName = (name: string) => {
        dispatch(handleOnSetName(name))
    }

    const onSetPhoto = (file: File, user: UserType) => {
        dispatch(handleOnUploadPhoto(file, user))
    }

    return {
        user,

        onLogin,
        onRegister,
        onLogout,
        onCheckingCurrentUser,
        onSetName,
        onSetPhoto
    }
}