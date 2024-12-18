import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { dataSlice } from "./data/dataSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        data: dataSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch