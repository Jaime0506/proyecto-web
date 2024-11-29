import { handleOnGetTasks, handleDeleteTask, handleGetTaskDocent, handleOnGetName } from "../../../store/auth/thunk";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Card, CardBody, Divider, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Task {
  task_id: string
  title: string
  description: string
  due_date: string
  create_by: string
}

export const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.auth.user);
  const state = useAppSelector((state) => state.data.currentSubject);
  const tasksFromStore: Task[] = useAppSelector((state) => state.data.tasks) || [];

  const [names, setNames] = useState<Record<string, string>>({});
  
  const fetchName = async (user_id: string) => {
    if (!names[user_id]) {
      const name = await handleOnGetName(user_id);
      setNames((prevNames) => ({ ...prevNames, [user_id]: name }));
    }
  };

  useEffect(()=>{
    if(!(userState?.role === "docent")){
    dispatch(handleOnGetTasks(userState?.id, state?.subject_id));
  } else {
    dispatch(handleGetTaskDocent(state?.subject_id))
  }},[])
  
  const handleCreateTask = () => {
    navigate("/app/board/InfoTask");
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      dispatch(handleDeleteTask(taskId, userState?.id, state?.subject_id));
    }
  };
  
  const handleEdit = (taskId: string) => {
    navigate(`/app/board/InfoTask/${taskId}`);
  };

  const sortedTasks = [...tasksFromStore].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  return (
    <div className="px-4 py-4 bg-white min-h-screen">
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

      <div className="mt-4 space-y-6 flex flex-col items-center">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => {
            fetchName(task.create_by);
            return(
            <div
              key={task.task_id}
              className="w-full max-w-3xl flex items-start justify-between"
            >
              <Link
                to={
                  userState?.role === "docent"
                    ? `/app/board/feedback/${task.task_id}`
                    : `/app/board/taskDelivery/${task.task_id}`
                }
                className="flex-grow"
              >
                <Card
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-300 p-4 min-h-[200px] cursor-pointer"
                >
                  <CardBody className="flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                    <p className="mb-2 text-sm flex-grow">{task.description}</p>
                    <p className="text-sm text-gray-700">
                      Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  </CardBody>
                  <Divider />
                  <p className="mb-2 text-sm flex-grow">Estudiante {names[task.create_by] || "Loading..."}</p>
                </Card>
              </Link>
              
              {userState?.role === "docent" && (
                <Button
                  onClick={() => handleEdit(task.task_id)}
                  color="warning"
                  size="sm"
                  className="ml-4 self-center"
                >
                  Editar
                </Button>
              )}

              {/* Botón de eliminar para docentes */}
              {userState?.role === "docent" && (
                <Button
                  onClick={() => handleDelete(task.task_id)}
                  color="danger"
                  size="sm"
                  className="ml-4 self-center"
                >
                  Eliminar
                </Button>
              )}
            </div>
          )})
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};