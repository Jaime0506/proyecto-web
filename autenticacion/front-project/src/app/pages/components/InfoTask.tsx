import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleUpdateTask, handleOnCreateTask } from "../../../store/auth/thunk";
import { Card, CardBody, Button, Input, Textarea, Spacer } from "@nextui-org/react";
import { useAuth } from '../../../hooks/useAuth';

interface TaskData {
  task_id: string;
  title: string;
  description: string;
  dueDate: string; // Asegúrate de que coincida con la propiedad 'dueDate'
}

export const InfoTask = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state = useAppSelector((state) => state.data.currentSubject);
  const { user } = useAuth();
  // Estado local para el formulario de edición
  const [formData, setFormData] = useState<TaskData>({
    task_id: "",
    title: "",
    description: "",
    dueDate: "", // Asegúrate de usar dueDate aquí
  });

  const task = useAppSelector((state) =>
    state.data.tasks.find((task) => task.task_id === taskId)
  );

  // Cargar la tarea cuando el componente se monta
  useEffect(() => {
    if (task) {
      setFormData({
        task_id: task.task_id,
        title: task.title,
        description: task.description,
        dueDate: task.due_date, // Asegúrate de convertir due_date a dueDate
      });
    }
  }, [task]);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para guardar los cambios
  const handleSave = () => {
    if (taskId) {
      dispatch(handleUpdateTask(taskId, formData)); // Llamar la acción para actualizar la tarea
      navigate("/app/board/Tasks"); // Redirigir después de guardar los cambios
      return
    }
    console.log(formData)
    dispatch(handleOnCreateTask(formData, user?.id, state?.subject_id));
  };

  return (
    <div className="px-4 py-4 bg-white min-h-screen">
      <Card className="max-w-xl mx-auto">
        <CardBody>
          <h2 className="text-2xl font-bold mb-4">Tarea</h2>

          <Input
            name="title"
            label="Título"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />

          <Textarea
            name="description"
            label="Descripción"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            rows={6}
            className="mb-4"
          />

          <Input
            name="dueDate" // Cambia 'due_date' a 'dueDate'
            label="Fecha de Entrega"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />

          <Spacer y={1} />

          <div className="flex justify-between">
            <Button onClick={() => navigate("/app/board/Tasks")} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};