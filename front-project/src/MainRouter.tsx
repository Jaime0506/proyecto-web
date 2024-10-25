import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainRoutes } from "./routes/MainRoutes";
import { NextUIProvider } from "@nextui-org/system";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
};
