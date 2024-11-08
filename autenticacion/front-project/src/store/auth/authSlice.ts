import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthType, UserType } from '../../types/redux';
import type { AuthError } from '@supabase/supabase-js';

const initialState: AuthType = {
    status: "not-authenticated",
    user: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        checking: (state) => {
            state.status = "checking"
            state.user = null
            state.error = null
        },

        login: (state, action: PayloadAction<UserType>) => {
            state.status = "authenticated"
            state.user = {...action.payload}
            state.error = null
        },

        logout: (state, action: PayloadAction<AuthError>) => {
            state.status = "not-authenticated"
            state.user = null
            state.error = action.payload
        },

        setError: (state, action: PayloadAction<AuthError>) => {
            state.error = action.payload
        },

        name: (state, action: PayloadAction<string> ) => {
            state.user!.name = action.payload
        }
    },
});

export const { checking, login, logout, setError } = authSlice.actions;