import {PayloadAction} from "@reduxjs/toolkit";
import {PlayerType} from "@/types/playerType";
import {GodfatherRoleType} from "@/store/roles";
import {GodfatherGameState} from "@/store/godfatherGame/godfatherSlice";
import {GodfatherPlayer} from "@/types/godfatherGame";

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
    }));
};

const revealPlayerRole = (state: GodfatherGameState, action: RevealPlayerRoleAction) => {
    const player = state.players.find(p => p.id === action.payload.playerId);

    if (player === undefined) return;

    player.roleRevealed = true;
};

const shuffleArray = <T>(array: T[]) => {
    let currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

export default {
    assignRolesToPlayersRandomly,
    revealPlayerRole,
};