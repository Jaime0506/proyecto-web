import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { NextUIProvider } from "@nextui-org/system";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useToastify } from "./hooks";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {

    const error = useAppSelector(state => state.auth.error)
    
    const { onCheckingCurrentUser } = useAuth()
    const { onSetError } = useToastify()

    useEffect(() => {
        // comprobar si existe una sesion activa
        onCheckingCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error?.message) onSetError(error) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <NextUIProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </NextUIProvider>
    );
};
