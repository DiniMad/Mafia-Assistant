import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {PlayersState, playersStorageKey} from "@/store/players/index";
import {addPlayer, reorderPlayer, togglePlayerSelect} from "@/store/players/index";
import {AppState} from "@/store";

export const playersListener = createListenerMiddleware();

playersListener.startListening({
    matcher: isAnyOf(addPlayer, reorderPlayer, togglePlayerSelect),

    effect: async (_, listenerApi) => {
        const appState = listenerApi.getState() as AppState;
        const players = appState.players.entities;
        localStorage.setItem(playersStorageKey, JSON.stringify(players));
    },
});