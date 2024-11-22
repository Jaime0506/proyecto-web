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

import accountLogo from "../assets/account.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const handleOnClick = () => {
    console.log("Navegando a Home");
    navigate("/");
  };

  return (
    <Navbar maxWidth="2xl" className="border-b-2 border-primary py-4">
      <NavbarBrand
        className="flex gap-2 hover:cursor-pointer"
        onClick={handleOnClick}
      >
        <Image src={LogoUMB} width={30} className="text-primary" />
        <p className="font-bold font-roboto text-3xl">Canvis</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        {/* Icono de cuenta */}
        <NavbarItem>
          <Link to="settings">
            <Image width={35} src={accountLogo} />
          </Link>
        </NavbarItem>
        {/* Botón para ir a Misiones */}
        <NavbarItem>
          <Button
            variant="ghost"
            color="primary"
            className="text-lg"
            onClick={() => navigate("/app/misiones")}
          >
            Ir a Misiones
          </Button>
        </NavbarItem>
        {/* Botón de cerrar sesión */}
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
