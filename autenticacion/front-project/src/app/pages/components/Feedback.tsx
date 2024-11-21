import { useParams } from "react-router-dom";

export const FeedBack = () => {
  const { taskId } = useParams(); // Obtiene el ID de la tarea desde la URL

  return (
    <div className="px-6 py-6 bg-gray-50 min-h-screen">
      {/* Título principal */}
      <h2 className="text-3xl font-bold mb-4">Entregas de la tarea</h2>

      {/* Mensaje indicando el ID de la tarea */}
      <p className="text-lg text-gray-700 mb-6">
        Estás viendo las entregas para la tarea con ID: <strong>{taskId}</strong>
      </p>

      {/* Placeholder para las entregas */}
      <div className="bg-white shadow-md rounded-md p-4">
        <p className="text-md text-gray-600">Aquí se mostrarán las entregas realizadas por los estudiantes.</p>

        {/* Agrega una lista de entregas o placeholders */}
        <ul className="mt-4 space-y-4">
          {/* Ejemplo estático para ver cómo luciría */}
          <li className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">Entrega de Juan Pérez</h3>
            <p className="text-gray-600">
              <strong>Estado:</strong> Pendiente de retroalimentación
            </p>
            <p className="text-gray-600">
              <strong>Fecha de entrega:</strong> 18/11/2024
            </p>
          </li>
        </ul>

        {/* Zona para retroalimentación (Docente) */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Retroalimentación</h3>
          <textarea
            placeholder="Escribe tu retroalimentación aquí..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Enviar retroalimentación
          </button>
        </div>
      </div>
    </div>
  );
};