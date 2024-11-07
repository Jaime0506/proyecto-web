import { useDisclosure } from "@nextui-org/modal";

import { TableSubjects } from "../../../components/TableSubjects";
import { ModalContainer } from "../../../components/ModalContainer";

import { useAuth } from "../../../hooks/useAuth";
import { SubjectType } from "../../../types/redux";
import { useState } from "react";
import { useSubjects } from "../../../hooks/useSubjects";

export const Subjects = () => {
  const { user } = useAuth();

  const { dataCareer, subjects } = useSubjects();

  const [subject, setSubject] = useState<SubjectType | null>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = (subject: SubjectType) => {
    setSubject(subject);
    onOpen();
  };

  if (!user) return <>Debes iniciar sesion</>;

  if (!subjects) return <>No pudimos obtener tu listado de materias</>;

  return (
    <main className="flex flex-col items-center justify-center p-12 gap-10">
      <section className=" w-[80%] max-w-[1500px] flex flex-col gap-6">
        <h2 className="font-roboto text-6xl">
          <strong className="text-primary">¡Bienvenido!</strong>
          {" " + user.name}
        </h2>

        <p className="font-open text-xl font-thin">
          En este modulo podras inscribir todas tus materias de tu semestre
          actual, reacuerda que cuando quieras hacer registro de tu horario,
          hacer click en "Registrar horario"
        </p>

        <section className="text-lg">
          <h3>
            Carrera:
            <span> </span>
            <span className="underline text-primary">{dataCareer?.name}</span>
          </h3>
          <h3>
            Semestre Actual:
            <span> </span>
            {/* <span className="underline text-primary">{user}</span> */}
          </h3>
        </section>
      </section>

      <section className="w-[80%] max-w-[1500px] flex flex-col gap-5">
        <h2 className="font-roboto text-2xl">Listado de materias</h2>

        <TableSubjects subjects={subjects} openModal={openModal} />
      </section>

      <ModalContainer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        data={subject as SubjectType}
      ></ModalContainer>
    </main>
  );
};
