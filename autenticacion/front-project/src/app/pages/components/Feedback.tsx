import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { handleUploadFeedBack } from "../../../store/auth/thunk";
import { Button, Input, Textarea, Card } from "@nextui-org/react";
import { supabase } from "../../../supabase/supabase";

export const FeedBack = () => {
  const { taskId } = useParams(); // Obtener el taskId desde la URL
  const dispatch = useAppDispatch();

  // Estados para guardar los datos
  const [feedback, setFeedback] = useState("");
  const [delivery, setDelivery] = useState("");
  const [grade, setGrade] = useState<number | "">("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false); // Indica si ya existe retroalimentación previa

  useEffect(() => {
    const fetchTaskDetails = async () => {
      // if (!taskId) return;

      const { data, error } = await supabase
        .schema("gr7")
        .from("task")
        .select("feedback, grade, delivery")
        .eq("task_id", taskId)
        .single();
       
      if (error) {
        console.error("Error al obtener los detalles de la tarea:", error);
        return;
      }

      setDelivery(data.delivery)
      // Si hay feedback y calificación, los mostramos como predeterminados
      if (data?.feedback || data?.grade !== null) {
        setFeedback(data.feedback || "");
        setGrade(data.grade ?? "");
        setIsFeedbackSubmitted(true); // Marcamos que ya se hizo la retroalimentación
      }
    };

    fetchTaskDetails();
  }, []);

  const handleSubmit = () => {
    if (!taskId) {
      alert("No se encontró el ID de la tarea. Por favor, regresa e intenta nuevamente.");
      return;
    }

    if (grade === "" || !feedback.trim()) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    // Enviar la retroalimentación
    dispatch(handleUploadFeedBack({ taskId, grade: Number(grade), feedback }));
    alert("¡Retroalimentación enviada exitosamente!");
    setIsFeedbackSubmitted(true);
  };

  return (
    <div className="px-4 py-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Retroalimentación de tarea</h2>
      <h1>Entrega: {delivery}</h1>
      <Card className="bg-white shadow-lg p-4 w-full max-w-md">
        <Input
          type="number"
          label="Calificación"
          value={grade === "" ? "" : String(grade)} // Convertimos a string si es un número
          onChange={(e) => setGrade(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Ingresa la calificación"
           // Desactivar si ya se envió
          fullWidth
          className="mb-4"
        />
        <Textarea
          label="Retroalimentación"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escribe aquí la retroalimentación..."
           // Desactivar si ya se envió
          fullWidth
          rows={6}
        />
          <Button
            onClick={handleSubmit}
            color="primary"
            size="md"
            className="mt-4 w-full"
          >
            Enviar Retroalimentación
          </Button>
        
        {isFeedbackSubmitted && (
          <p className="text-green-600 mt-4 text-center">
            La retroalimentación ya fue enviada.
          </p>
        )}
      </Card>
    </div>
  );
};
