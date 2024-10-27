import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DataType, AttendanceType, SubjectsType } from '../../types/redux';

const initialState: DataType = {
    attendance: null,
    subjects: null,
    currentSubject: null
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        attendance: (state, action: PayloadAction<AttendanceType[]>) => {
            state.attendance = {...action.payload}
        },
        subjects: (state, action: PayloadAction<SubjectsType[] | null>) => {
            state.subjects = action?.payload ? [...action.payload] : null // [] para array {} para objeto
        },
        currentSubject: (state, action: PayloadAction<SubjectsType>)=>{
            state.currentSubject = {...action.payload}
        }
    },
});

export const { attendance, subjects, currentSubject } = dataSlice.actions;