﻿import {configureStore} from "@reduxjs/toolkit";
import {playersReducer} from "./players";
import {playersListener} from "@/store/players/listeners";
import {godfatherReducer} from "@/store/godfather";

export const store = configureStore({
    reducer: {
        players: playersReducer,
        godfather: godfatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(playersListener.middleware),
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch