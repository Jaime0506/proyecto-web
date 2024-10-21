import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { useAuth } from "../hooks/useAuth";

export default function SideBar() {
  const { onLogout } = useAuth();

  return (
    <Navbar
      className=" border-r-2 border-primary py-4 flex flex-col"
      style={{ top: "97.33px", height: "700px", width: "300px" }}
    >
      <NavbarContent
        className="flex flex-col pt-10"
        style={{ height: "700px", width: "300px" }}
      >
        <NavbarItem className="mb-2">
          <Link
            to={"home"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Pagina Principal
          </Link>
        </NavbarItem>
        <NavbarItem className="mb-2">
          <Link
            to={"student"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Asignatura 1
          </Link>
        </NavbarItem>
        <NavbarItem className="mb-2">
          <Link
            to={"student/subjects"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Asignatura 2
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
