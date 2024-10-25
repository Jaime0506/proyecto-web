import { Navigate, RouteObject } from "react-router-dom";
import { ValidationRoutes } from "../components/ValidationRoutes";
import { HomePage } from "./pages/HomePage";
import { Schedule, Subjects } from "./pages/estudent";
import { Example } from "./pages/docent/Example";
import { SettingsPage } from "./pages/SettingsPage";

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
            path: 'docent',
            element: <Example />
        },
        {
            path: 'settings',
            element: <SettingsPage />
        },
        {
            path: 'student',
            children: [
                {
                    path: '',
                    element: <Navigate to={'schedule'} />
                },{
                    path: 'schedule',
                    element: <Schedule />
                },
                {
                    path: 'schedule/:asignatura',
                    element: <Schedule />
                },
                {
                    path: 'subjects',
                    element: <Subjects />
                },
                {
                    path: '*',
                    element: <Navigate to={'schedule'} />
                }
            ]
        }
    ]
}