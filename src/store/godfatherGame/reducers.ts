import {PayloadAction} from "@reduxjs/toolkit";
import {PlayerType} from "@/types/playerType";
import {GodfatherRoleType} from "@/store/roles";
import {GodfatherGameState} from "@/store/godfatherGame/godfatherSlice";
import {GodfatherPlayer} from "@/types/godfatherGame";
import {shuffleArray} from "@/utilites/arrayUtils";

type AssignRolesToPlayersRandomlyAction = PayloadAction<{
    players: PlayerType[],
    roles: GodfatherRoleType[]
}>
type RevealPlayerRoleAction = PayloadAction<{
    playerId: GodfatherPlayer["id"],
}>

const assignRolesToPlayersRandomly = (state: GodfatherGameState, action: AssignRolesToPlayersRandomlyAction) => {
    const selectedPlayers = action.payload.players.filter(p => p.selected);
    const selectedRoles = action.payload.roles.filter(r => r.selected);
    const rolesFlatten = selectedRoles.map(r =>
        r.variety === "One" ? r : Array<GodfatherRoleType>(r.count).fill(r))
        .flat();

    const shuffledRoles = shuffleArray(rolesFlatten);

    state.players = selectedPlayers.map<GodfatherPlayer>((player, index) => ({
        id: player.id,
        name: player.name,
        roleKey: shuffledRoles[index].key,
        roleSide: shuffledRoles[index].side,
        roleRevealed: false,
        eliminated: false,
    }));
};

const revealPlayerRole = (state: GodfatherGameState, action: RevealPlayerRoleAction) => {
    const player = state.players.find(p => p.id === action.payload.playerId);

    if (player === undefined) return;

    player.roleRevealed = true;
};

export default {
    assignRolesToPlayersRandomly,
    revealPlayerRole,
};