import { RouteObject } from "react-router-dom"

import { RootRedirect } from "./RootRedirect"

import { AppRoutes } from "../app"
import { AuthRoutes } from "../auth"

export const MainRoutes: RouteObject[] = [
    {
        path: '/',
        element: <RootRedirect />,
    },
    AuthRoutes,
    AppRoutes
]