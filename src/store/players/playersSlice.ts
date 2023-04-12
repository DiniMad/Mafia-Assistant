import {createSlice} from "@reduxjs/toolkit";
import reducers from "@/store/players/reducers";
import {PlayerType} from "@/types/playerType";
import {initializePlayersFromStorage} from "@/store/players/thunk";

export type PlayersState = {
    entities: PlayerType[];
}
const initialState: PlayersState = {
    entities: [],
};

export const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: reducers,
    extraReducers: builder => {
        builder.addCase(initializePlayersFromStorage.fulfilled,
            (state, action) => {
                state.entities = action.payload;
            });
    },
});

export const {
    addPlayer,
    reorderPlayer,
    togglePlayerSelect,
} = playersSlice.actions;

export const playersReducer = playersSlice.reducer;