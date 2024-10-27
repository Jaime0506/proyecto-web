import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DataType, AttendanceType, SubjectsType } from '../../types/redux';

const initialState: DataType = {
    subjects: null,
    attendance: null
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
    },
});

export const { attendance, subjects } = dataSlice.actions;