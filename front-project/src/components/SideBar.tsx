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
            to={"docent"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Menu Principal
          </Link>
        </NavbarItem>
        <NavbarItem className="mb-2">
          <Link
            to={"student"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Materias
          </Link>
        </NavbarItem>
        <NavbarItem className="mb-2">
          <Link
            to={"student/subjects"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Inscribir materias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="ghost"
            color="primary"
            className="text-lg"
            onClick={onLogout}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}


