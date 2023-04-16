import {PlayerType} from "@/types/playerType";
import {nanoid, PayloadAction} from "@reduxjs/toolkit";
import {PlayersState} from "@/store/players/index";

type AddPlayerAction = PayloadAction<{
    playerName: PlayerType["name"]
}>;
type ReorderPlayerAction = PayloadAction<{
    playerId: PlayerType["id"],
    sourceIndex: number,
    destinationIndex: number
}>;
type TogglePlayerSelectAction = PayloadAction<{
    playerId: PlayerType["id"],
}>;

const addPlayer = (state: PlayersState, action: AddPlayerAction) => {
    const player: PlayerType = {
        id: nanoid(),
        name: action.payload.playerName,
        selected: false,
    };
    state.entities.unshift(player);
};
const reorderPlayer = (state: PlayersState, action: ReorderPlayerAction) => {
    const player = state.entities.find(p => p.id === action.payload.playerId);
    if (!player) return;

    state.entities.splice(action.payload.sourceIndex, 1);
    state.entities.splice(action.payload.destinationIndex, 0, player);
};
const togglePlayerSelect = (state: PlayersState, action: TogglePlayerSelectAction) => {
    const player = state.entities.find(p => p.id === action.payload.playerId);
    if (!player) return;

    player.selected = !player.selected;
};

export default {addPlayer, reorderPlayer, togglePlayerSelect};