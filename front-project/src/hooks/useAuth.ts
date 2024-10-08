import { checking, login, logout } from "../store/auth/authSlice"
import { UserType } from "../types/redux"
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
    
    const onLogin = (user: UserType) => {
        dispatch(checking())

        setTimeout(() => {
            dispatch(login(user))
        }, 1000)
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