import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function InsiderNavBar() {
  const state = useAppSelector((state) => state.auth.user);
  return (
    <Navbar
      maxWidth="2xl"
      className="border-b-2 border-primary py-3 z-50"
      style={{ top: "97.33px" }}
    >
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        <NavbarItem className="">
          <Link
            to={"docent"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Novedades
          </Link>
        </NavbarItem>
        { state?.role === "docent" && (<NavbarItem className="">
          <Link
            to={"student"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Asistencia
          </Link>
        </NavbarItem>)}
        <NavbarItem>
          <Link
            to={"student/subjects"}
            className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
          >
            Tareas
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
