import { useParams } from "react-router-dom";

export const TaskDelivery = () => {
  const { taskId } = useParams(); // Obtiene el taskId desde la URL

  return (
    <div>
      <h2>Entrega de tarea</h2>
      <p>¡Bienvenido a la entrega de la tarea con ID: {taskId}!</p> {/* Mensaje de bienvenida */}
    </div>
  );
};
