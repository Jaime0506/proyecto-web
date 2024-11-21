import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { handleUploadTaskSubmission } from "../../../store/auth/thunk";
import { Button, Textarea, Card } from "@nextui-org/react";
import { supabase } from "../../../supabase/supabase";

export const TaskDelivery = () => {
  const { taskId } = useParams(); // Obtiene el taskId desde la URL
  const [submission, setSubmission] = useState(""); // Estado para la entrada del estudiante
  const [deliveryInfo, setDeliveryInfo] = useState<{
    delivery: string;
    grade: number | null;
    feedback: string | null;
  } | null>(null); // Estado para la información de la entrega
  const dispatch = useAppDispatch();

  // Fetch de los datos de la tarea
  useEffect(() => {
    const fetchTaskDelivery = async () => {
      if (!taskId) return;

      const { data, error } = await supabase
        .schema("gr7")
        .from("task")
        .select("delivery, grade, feedback")
        .eq("task_id", taskId)
        .single();

      if (error) {
        console.error("Error al obtener la entrega:", error);
        return;
      }

      setDeliveryInfo(data);
    };

    fetchTaskDelivery();
  }, [taskId]);

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

  // Render condicional
  return (
    <div className="px-4 py-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Entrega de tarea</h2>
      

      {deliveryInfo && deliveryInfo.delivery ? (
        // Si ya hay una entrega, muestra los detalles
        <Card className="bg-white shadow-lg p-4 w-full max-w-md">
          <h3 className="text-xl font-semibold">Tu entrega</h3>
          <p className="text-gray-700 mt-2">{deliveryInfo.delivery}</p>

          {deliveryInfo.grade !== null && (
            <>
              <h4 className="text-lg font-semibold mt-4">Nota:</h4>
              <p className="text-gray-700">{deliveryInfo.grade}</p>
            </>
          )}

          {deliveryInfo.feedback && (
            <>
              <h4 className="text-lg font-semibold mt-4">Retroalimentación:</h4>
              <p className="text-gray-700">{deliveryInfo.feedback}</p>
            </>
          )}
          <p className="text-green-600 mt-4 text-center">
            La Tarea ya fue enviada.
          </p>
        </Card>
      ) : (
        // Si no hay entrega, muestra el formulario
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
      )}
    </div>
  );
};
