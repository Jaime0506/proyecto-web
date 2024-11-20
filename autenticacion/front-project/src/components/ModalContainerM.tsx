// ModalContainer.tsx
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { MissionType } from "../types/redux";

interface ModalContainerProps {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  data: MissionType | null;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ isOpen, onOpenChange, data }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent className="p-4">
        {(onClose) => (
          <>
            <ModalHeader>{data?.name}</ModalHeader>
            <ModalBody>
              <p>{data?.description}</p>
              <p>Puntos: {data?.points}</p>
              <p>Día: {data?.day}</p>
              <p>Horario: {data?.schedule}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
