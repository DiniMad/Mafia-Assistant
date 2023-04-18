import {createSlice} from "@reduxjs/toolkit";
import reducers from "@/store/godfatherGame/reducers";
import {GodfatherPlayer} from "@/types/godfatherGame";


export type GodfatherGameState = {
    players: GodfatherPlayer[]
}
const initialState: GodfatherGameState = {
    players: [],
};

export const godfatherGameSlice = createSlice({
    name: "godfatherGame",
    initialState,
    reducers: reducers,
});

export const {
    assignRolesToPlayersRandomly,
    revealPlayerRole,
} = godfatherGameSlice.actions;

export const godfatherGameReducer = godfatherGameSlice.reducer;