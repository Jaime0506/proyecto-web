import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthType, UserType } from '../../types/redux';

const initialState: AuthType = {
    status: "not-authenticated",
    user: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        checking: (state) => {
            state.status = "checking"
            state.user = null
            state.errorMessage = null
        },

        login: (state, action: PayloadAction<UserType>) => {
            state.status = "authenticated"
            state.user = {...action.payload}
            state.errorMessage = null
        },

        logout: (state) => {
            state.status = "not-authenticated"
            state.user = null
            state.errorMessage = null
        }
    },
});

export const { checking, login, logout } = authSlice.actions;