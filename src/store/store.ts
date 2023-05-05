import {configureStore} from "@reduxjs/toolkit";
import {playersReducer} from "./players";
import {playersListener} from "@/store/players/listeners";
import {rolesReducer} from "@/store/roles";
import {godfatherGameReducer} from "@/store/godfatherGame";
import {rolesListener} from "@/store/roles/listeners";

export const store = configureStore({
    reducer: {
        players: playersReducer,
        roles: rolesReducer,
        godfatherGame: godfatherGameReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(playersListener.middleware)
            .concat(rolesListener.middleware),
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch