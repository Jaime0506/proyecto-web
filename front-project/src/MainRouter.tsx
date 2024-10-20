import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainRoutes } from "./routes/MainRoutes";
import { NextUIProvider } from "@nextui-org/system";
import { useAuth } from "./hooks/useAuth";
import { userExample } from "./data/dataExample";
import { useEffect } from "react";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {
  const { onLogin } = useAuth();

  useEffect(() => onLogin(userExample), []);

  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
};
