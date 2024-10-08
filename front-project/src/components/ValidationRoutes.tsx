import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { AuthLayout } from "./AuthLayout"
import NavBar from "./NavBar"

interface ValidationRoutesProps {
    redirectTo: string
    validation: (status: string) => boolean
    type?: "app"
}

export const ValidationRoutes = ({ redirectTo, validation, type }: ValidationRoutesProps) => {

    const state = useAppSelector(state => state.auth.status)

    if (validation(state)) {

        if (type === "app") {

            console.log("Deberia entrar aca")

            return (
                <div>
                    <NavBar />
                    <Outlet />
                </div>
            )
        }
        // Si estoy donde deberia estar, cargo el contenido
        return (
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        )
    }

    return <Navigate to={redirectTo} />
}
