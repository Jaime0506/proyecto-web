import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleOnGetTasks } from "../../../store/auth/thunk";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { useAppSelector } from "../../../hooks";
import { Card, CardBody, Divider, Button } from "@nextui-org/react";

// Define la interfaz para el tipo de tarea (esto ayuda con TypeScript)
interface Task {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
}

export const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtenemos el estado del usuario y las tareas desde el store
  const userState = useAppSelector((state: RootState) => state.auth.user);
  const tasksFromStore: Task[] = useAppSelector((state: RootState) => state.data.tasks) || [];

  // Efecto para obtener las tareas cuando se monta el componente
  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(handleOnGetTasks() as any);
    };
    fetchTasks();
  }, [dispatch]);

  // Función para redirigir a la página de entrega de tarea
  const onTaskClick = (taskId: string) => {
    // Muestra el mensaje en consola
    navigate(`/app/board/taskDelivery/${taskId}`); // Redirige a TaskDelivery con el taskId en la URL
  };

  // Función para redirigir al formulario de creación de tarea
  const handleCreateTask = () => {
    navigate("/app/board/InfoTask");
  };

  // Ordenamos las tareas por fecha de entrega (due_date)
  const sortedTasks = [...tasksFromStore].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  return (
    <div className="px-4 py-4 bg-white min-h-screen">
      {/* Mostrar el botón de crear tarea solo si el usuario tiene rol de docente */}
      {userState?.role === "docent" && (
        <div className="flex justify-start mb-6">
          <Button
            onClick={handleCreateTask}
            color="primary"
            size="md"
            className="text-lg font-semibold flex items-center justify-center"
          >
            <span className="text-xl mr-1">+</span>Crear
          </Button>
        </div>
      )}

      {/* Contenedor de tareas */}
      <div className="mt-4 space-y-6 flex flex-col items-center">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <Link to={`/app/board/taskDelivery/${task.task_id}`}>
              <Card
                key={task.task_id}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-300 p-4  min-h-[200px] cursor-pointer"
                style={{width:'900px'}}
              >
                <CardBody className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                  <p className="mb-2 text-sm flex-grow">{task.description}</p>
                  <p className="text-sm text-gray-700">
                    Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </CardBody>
                <Divider />
              </Card>
            </Link>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};
