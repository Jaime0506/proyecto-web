import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { NextUIProvider } from "@nextui-org/system";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {
    
    const { onCheckingCurrentUser } = useAuth()

    useEffect(() => {
        // comprobar si existe una sesion activa
        onCheckingCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
    );
};
