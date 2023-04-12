import {createAsyncThunk} from "@reduxjs/toolkit";
import {PlayerType} from "@/types/playerType";
import {playersStorageKey} from "@/store/players/index";

export const initializePlayersFromStorage = createAsyncThunk(
    "players/initializeFromStorage",
    (): PlayerType[] => {
        const playersJson = localStorage.getItem(playersStorageKey);
        if (playersJson === null) return [];

        return JSON.parse(playersJson);
    },
);