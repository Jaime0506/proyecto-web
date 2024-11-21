import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { handleUploadFeedBack } from "../../../store/auth/thunk";
import { Card, Input, Textarea, Button } from "@nextui-org/react";
import { supabase } from "../../../supabase/supabase";// Ajusta la ruta según tu proyecto

export const FeedBack = () => {
  const { taskId } = useParams(); // Obtiene el ID de la tarea desde la URL
  const dispatch = useAppDispatch();
  const [taskData, setTaskData] = useState<any>(null); // Estado para la tarea
  const [feedback, setFeedback] = useState(""); // Retroalimentación
  const [grade, setGrade] = useState(""); // Calificación

  // Cargar datos de la tarea
  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      const { data, error } = await supabase
        .schema("gr7")
        .from("task")
        .select("delivery") // Puedes ajustar los campos necesarios
        .eq("task_id", taskId)
        .single();

      if (error) {
        console.error("Error al cargar la tarea:", error);
        return;
      }

      setTaskData(data);
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = () => {
    if (!taskId || !grade.trim() || !feedback.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Dispatch para guardar la retroalimentación
    dispatch(handleUploadFeedBack({ taskId, grade: Number(grade), feedback }));
    alert("¡Retroalimentación enviada exitosamente!");
    setFeedback("");
    setGrade("");
  };

  return (
    <div className="px-4 py-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Retroalimentación</h2>
      <p className="mb-4 text-gray-600">Tarea entregada con ID: {taskId}</p>

      <Card className="bg-white shadow-lg p-4 w-full max-w-md">
        {taskData ? (
          <>
            <h3 className="font-semibold text-lg mb-2">Entrega del Estudiante</h3>
            <p className="mb-4 text-gray-700">{taskData.delivery}</p>
            <Input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              aria-label="Calificación"
              placeholder="Escribe la calificación..."
              fullWidth
            />
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              aria-label="Retroalimentación"
              placeholder="Escribe la retroalimentación..."
              fullWidth
              rows={4}
              className="mt-4"
            />
            <Button
              onClick={handleSubmit}
              color="primary"
              size="md"
              className="mt-4 w-full"
            >
              Enviar Retroalimentación
            </Button>
          </>
        ) : (
          <p>Cargando datos de la tarea...</p>
        )}
      </Card>
    </div>
  );
};
