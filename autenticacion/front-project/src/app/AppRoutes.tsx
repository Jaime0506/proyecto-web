import { Navigate, RouteObject } from "react-router-dom";
import { ValidationRoutes } from "../components/ValidationRoutes";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import  Missions from "./pages/microdesafios/mision";
import { BoardChildren } from "./BoardChildren";

import FormularioSalon from "./pages/asignacion_salones/salones/FormularioSalones";


const validation = (status: string):boolean => {
    if (status === "authenticated") return true

    return false
}


export const AppRoutes: RouteObject = {
    path: 'app',
    element: <ValidationRoutes redirectTo="/" validation={validation} type="app" />,
    children: [
        {
            path: '',
            element: <Navigate to={'home'} />
        },
        {
            path: 'home',
            element: <HomePage />
        },
        {
            path: 'settings',
            element: <SettingsPage />
        },
        {
            path: 'misiones',
            element: <Missions/>
        },
        {
            path: 'formulariosalones',
            element: <FormularioSalon/>
        },


        BoardChildren
    ]
}