import {configureStore} from "@reduxjs/toolkit";
import {playersReducer} from "./players";
import {playersListener} from "@/store/players/listeners";
import {rolesReducer} from "@/store/roles";

export const store = configureStore({
    reducer: {
        players: playersReducer,
        roles: rolesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(playersListener.middleware),
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch