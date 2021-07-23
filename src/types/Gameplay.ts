import {ExclusivePersistentProperties, PersistentPlayer, PersistentPlayerRole} from "./PersistentData";
import {PLAYER_ROLES} from "../initial-configs";

export type GameplayPlayerRole = Omit<PersistentPlayerRole, keyof ExclusivePersistentProperties | "variety"> & {
    revealed: boolean,
}

export type GameplayPlayer = Omit<PersistentPlayer, keyof ExclusivePersistentProperties> & {
    talked: boolean,
    talking: boolean,
    role: GameplayPlayerRole
}

export type Gameplay = {
    players: GameplayPlayer[],
    displayRoles: boolean,
}

// TODO: Remove the mock initialization.
export const generatePlayers = (players: PersistentPlayer[]) => {
    return players.map((player, index) => {
        const gameplayPlayer: GameplayPlayer = {
            ...player,
            talked: index < 3,
            talking: index === 3,
            role: {
                ...PLAYER_ROLES[Math.floor(Math.random() * PLAYER_ROLES.length)]
                , revealed: false,
            },
        };
        return gameplayPlayer;
    });
};