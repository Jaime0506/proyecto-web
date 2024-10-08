import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { SubjectType } from "../types/redux"
import { Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"

interface ModalContainerProps {
    isOpen: boolean
    onOpenChange: ((isOpen: boolean) => void) | undefined
    data: SubjectType
}

export const ModalContainer = ({ isOpen, onOpenChange, data }: ModalContainerProps) => {

    const handleOnSelected = (item: Selection) => {
        console.log(item.toString())
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" >
            <ModalContent className="p-4">
                {(onClose) => (
                    <>
                        <ModalHeader>{data.name}</ModalHeader>
                        <ModalBody>
                            <Table 
                                color="success"
                                aria-label="table with list of groupes"
                                selectionMode="single"
                                onSelectionChange={(selectedKeys) => {
                                    handleOnSelected(selectedKeys)
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>Grupo</TableColumn>
                                    <TableColumn>Dia</TableColumn>
                                    <TableColumn>Horario</TableColumn>
                                </TableHeader>
                                <TableBody>
                                        <TableRow key={1}>
                                            <TableCell>Ejemplop</TableCell>
                                            <TableCell>Emote</TableCell>
                                            <TableCell>YUju</TableCell>
                                        </TableRow>
                                        <TableRow key={2}>
                                            <TableCell>Ejemplop</TableCell>
                                            <TableCell>Emote</TableCell>
                                            <TableCell>YUju</TableCell>
                                        </TableRow>
                                        <TableRow key={3}>
                                            <TableCell>Ejemplop</TableCell>
                                            <TableCell>Emote</TableCell>
                                            <TableCell>YUju</TableCell>
                                        </TableRow>
                                        <TableRow key={4}>
                                            <TableCell>Ejemplop</TableCell>
                                            <TableCell>Emote</TableCell>
                                            <TableCell>YUju</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="success"
                                onClick={onClose}
                            >
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
