import { useEffect, useState } from "react"
import { useDisclosure } from "@nextui-org/modal"

import { TableSubjects } from "../../../components/TableSubjects"
import { ModalContainer } from "../../../components/ModalContainer"

import { useAuth } from "../../../hooks/useAuth"
import { CareerType, SubjectType } from "../../../types/redux"
import { exampleCareer } from "../../../data/dataExample"

export const Subjects = () => {

    const { user } = useAuth()
    const [dataCareer, setDataCareer] = useState<CareerType | null>();
    const [subjects, setSubjects] = useState<SubjectType[] | null>();
    const [subject, setSubject] = useState<SubjectType | null>();

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handlerDataCareer = () => {

        if (!user) return []

        const subjects = dataCareer ? dataCareer.subjects[user?.semester - 1] : []


        setSubjects(subjects)
    }

    const openModal = (subject: SubjectType) => {
        setSubject(subject)
        onOpen()
    }

    useEffect(() => {
        if (user) {
            const temp = exampleCareer.filter(career => career.id === user?.career_id)[0]
            setDataCareer(temp)
        }
    }, [user])

    useEffect(() => {
        handlerDataCareer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCareer])

    if (!user) return <>Debes iniciar sesion</>

    if (!subjects) return <>No pudimos obtener tu listado de materias</>

    return (
        <main className="flex flex-col items-center justify-center p-12 gap-10">
            <section className=" w-[80%] max-w-[1500px] flex flex-col gap-6">
                <h2 className="font-roboto text-6xl">
                    <strong className="text-primary">
                        ¡Bienvenido!
                    </strong>
                    {" " + user.name}
                </h2>

                <p className="font-open text-xl font-thin">En este modulo podras inscribir todas tus materias de tu semestre actual, reacuerda que cuando quieras hacer registro de tu horario, hacer click en "Registrar horario"</p>

                <section className="text-lg">
                    <h3>
                        Carrera:

                        <span> </span>

                        <span className="underline text-primary">
                            {dataCareer?.name}
                        </span>
                    </h3>
                    <h3>
                        Semestre Actual:

                        <span> </span>

                        <span className="underline text-primary">
                            {user.semester}
                        </span>
                    </h3>
                </section>
            </section>

            <section className="w-[80%] max-w-[1500px] flex flex-col gap-5">
                <h2 className="font-roboto text-2xl">Listado de materias</h2>

                <TableSubjects subjects={subjects} openModal={openModal} />
            </section>

            <ModalContainer isOpen={isOpen} onOpenChange={onOpenChange} data={subject as SubjectType} >

            </ModalContainer>
        </main>
    )
}
