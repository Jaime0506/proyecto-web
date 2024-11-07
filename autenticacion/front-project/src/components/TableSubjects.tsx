import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { SubjectType } from "../types/redux"
import { useEffect, useState } from "react"

interface TableSubjectsProps {
    subjects: SubjectType[]
    openModal: (subject: SubjectType) => void
}

export const TableSubjects = ({ subjects, openModal }: TableSubjectsProps) => {
    const [data, setData] = useState<SubjectType[]>();

    const handleOnOpenModal = (subject: SubjectType) => {
        openModal(subject)
    }

    const renderHeaders = () => {
        const headers = ["ID", "NOMBRE", "CREDITOS", "CUPOS DISPONIBLES", "SELECCIONAR"]

        return headers.map((header, index) => (
            <TableColumn key={index}>{header.toUpperCase()}</TableColumn>
        ))
    }

    const renderRows = () => {
        if (!data) return <></>

        return data.map((subject, index) => (
            <TableRow key={index}>
                <TableCell>{subject.id}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{subject.available > 0 ? "Disponible" : "No hay cupos disponibles"}</TableCell>
                <TableCell>
                    <i className="fa-solid fa-square-check text-2xl hover:cursor-pointer" onClick={() => handleOnOpenModal(subject)}></i>
                </TableCell>
            </TableRow>
        ))
    }

    useEffect(() => {
        const temp = [...subjects]

        setData(temp)
    }, [subjects])

    if (!data || data.length === 0 ) return <>Loading</>

    return (
        <Table aria-label="table subjects">
            <TableHeader>
                {renderHeaders()}
            </TableHeader>
            <TableBody>
                {renderRows()}
            </TableBody>
        </Table>
    )
}
