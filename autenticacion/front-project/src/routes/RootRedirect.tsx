import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { Loader } from "../components/Loader"

export const RootRedirect = () => {
    const status = useAppSelector(state => state.auth.status) 

    if (status === "authenticated") {
        return <Navigate to={'/app'} />
    }

    if (status === "not-authenticated") {
        return <Navigate to={'/auth/login'} />
    }

    return <Loader />
}