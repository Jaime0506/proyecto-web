import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleOnCreateTask } from '../../../store/auth/thunk';  // Importamos la función
import { RootState, AppDispatch } from '../../../store/store';
import { TaskData } from '../../../types/redux';  // Importa el tipo TaskData desde el archivo de tipos
import { Input, Textarea, Button, Spacer, Card } from '@nextui-org/react'; // Eliminamos el Text de NextUI

export const InfoTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Obtener los datos del usuario y asignatura desde el estado de Redux
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const subjectId = useSelector((state: RootState) => state.data.currentSubject?.subject_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!userId || !subjectId) {
      console.error('Falta el ID del usuario o de la asignatura');
      return;
    }

    // Crear el objeto newTask que será enviado al backend
    const newTask: TaskData = {
      title,
      description,
      dueDate,  // Asegúrate de que el campo sea 'dueDate'
      create_by: userId, // Usuario que crea la tarea
      subject_id: subjectId, // ID de la asignatura
    };

    console.log('Datos a enviar:', newTask);

    // Despachar la acción para crear la tarea en la base de datos y actualizar el estado
    dispatch(handleOnCreateTask(newTask))
      .then(() => {
        navigate('/app/board/tasks'); // Redirige tras crear la tarea
      })
      .catch((error) => {
        console.error("Error al crear la tarea:", error);
        setError("Hubo un error al crear la tarea. Intenta nuevamente.");
      });
  };

  return (
    <Card style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3>Crea una nueva tarea</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <Input
            fullWidth
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Textarea
            fullWidth
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            fullWidth
            type="date"
            label="Fecha de entrega"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <Spacer y={1} />

        <Button type="submit" color="primary" size="lg" fullWidth>
          Crear tarea
        </Button>
      </form>
    </Card>
  );
};
