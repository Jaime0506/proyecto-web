import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DataType, AttendanceType, SubjectsType, TaskType } from '../../types/redux';

const initialState: DataType = {
    attendance: null,
    subjects: null,
    currentSubject: null,
    tasks: [], // Aseguramos que tasks siempre sea un array vacío inicialmente
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        attendance: (state, action: PayloadAction<AttendanceType[] | null>) => {
            state.attendance = action.payload ? [...action.payload] : null;
        },
        subjects: (state, action: PayloadAction<SubjectsType[] | null>) => {
            state.subjects = action.payload ? [...action.payload] : null;
        },
        currentSubject: (state, action: PayloadAction<SubjectsType>) => {
            state.currentSubject = { ...action.payload };
        },
        tasks: (state, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload; // Guardamos las tareas en el estado de Redux
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks!.push(action.payload); // Agrega una nueva tarea al array de tareas
        }
    },
});

export const { attendance, subjects, currentSubject, tasks, addTask } = dataSlice.actions;

export default dataSlice.reducer;
