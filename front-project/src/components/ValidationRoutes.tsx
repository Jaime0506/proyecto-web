
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { AuthLayout } from "./AuthLayout";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface ValidationRoutesProps {
  redirectTo: string;
  validation: (status: string) => boolean;
  type?: "app";
}

export const ValidationRoutes = ({ redirectTo, validation,type, }: ValidationRoutesProps) => {
  
  const state = useAppSelector((state) => state.auth.status);

  if (validation(state)) {
    if (type === "app") {
      return (
        <div>
          <NavBar />


          <div className="flex flex-row">
            <SideBar />
            <Outlet />
          </div>
        </div>
      );
    }
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    );
  }


  return <Navigate to={redirectTo} />; {/* <RootRedirect /> */}
};



