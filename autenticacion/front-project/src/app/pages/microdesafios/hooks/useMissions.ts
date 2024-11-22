import { useEffect, useState } from "react";
import { MissionType } from "../../../../../src/types/redux";

export const useMissions = () => {
  const [missions, setMissions] = useState<MissionType[] | null>(null);
  const [dataCareer, setDataCareer] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Aquí iría la lógica de obtención de misiones, ya sea desde una API o un contexto
    // Simulación de carga de datos
    const fetchedMissions = [
      { id: 1, name: "Misión 1", description: "Descripción de la misión 1" },
      { id: 2, name: "Misión 2", description: "Descripción de la misión 2" },
    ];
    setMissions(fetchedMissions);

    // Puedes añadir lógica para obtener datos de la carrera si es necesario
    setDataCareer({ name: "Ingeniería en Misiones" });
  }, []);

  return { missions, dataCareer };
};
