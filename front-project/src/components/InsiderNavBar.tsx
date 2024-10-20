import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  } from "@nextui-org/navbar";
  
  
  import { Image } from "@nextui-org/image";
  import LogoUMB from "../assets/canvas-logo.svg";
  import { Link, useNavigate } from "react-router-dom";
  import { Button } from "@nextui-org/button";
  import { useAuth } from "../hooks/useAuth";
  
  
  export default function InsiderNavBar() {
    const navigate = useNavigate();
    const { onLogout } = useAuth();
  
  
    const handleOnClick = () => {
      console.log("Me llamaron aro");
      navigate("");
    };
  
  
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
          <NavbarItem className="">
            <Link
              to={"student"}
              className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
            >
              Asistencia
            </Link>
          </NavbarItem>
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
  
  
  