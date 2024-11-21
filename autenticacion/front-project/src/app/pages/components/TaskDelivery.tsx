import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { handleUploadTaskSubmission } from "../../../store/auth/thunk";
import { Button, Textarea, Card } from "@nextui-org/react";

export const TaskDelivery = () => {
  const { taskId } = useParams(); // Obtiene el taskId desde la URL
  const [submission, setSubmission] = useState(""); // Estado para la entrada del estudiante
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!taskId) {
      alert("No se encontró el ID de la tarea. Por favor, regresa e intenta nuevamente.");
      return;
    }

    if (!submission.trim()) {
      alert("Por favor, escribe algo antes de enviar la tarea.");
      return;
    }

    // Dispatch para subir la tarea
    dispatch(handleUploadTaskSubmission({ taskId, delivery: submission }));
    alert("¡Tarea enviada exitosamente!");
    setSubmission(""); // Limpia el campo de texto después del envío
  };

  return (
    <div className="px-4 py-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Entrega de tarea</h2>
      <p className="mb-4 text-gray-600">¡Bienvenido a la entrega de la tarea con ID: {taskId}!</p>

      <Card className="bg-white shadow-lg p-4 w-full max-w-md">
        <Textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          aria-label="Escribe tu tarea"
          placeholder="Escribe aquí tu entrega de tarea..."
          fullWidth
          rows={6}
        />
        <Button
          onClick={handleSubmit}
          color="primary"
          size="md"
          className="mt-4 w-full"
        >
          Enviar Tarea
        </Button>
      </Card>
    </div>
  );
};