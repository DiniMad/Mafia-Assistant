import {ExclusivePersistentProperties, PersistentPlayer, PersistentPlayerRole} from "./PersistentData";

export type GameplayPlayerRole = Omit<PersistentPlayerRole, keyof ExclusivePersistentProperties | "variety"> & {
    revealed: boolean,
}

export type GameplayPlayer = Omit<PersistentPlayer, keyof ExclusivePersistentProperties> & {
    role: GameplayPlayerRole,
    active: boolean,
    talked: boolean,
    talking: boolean,
}

export type Config = {
    talkTime: number,
    challengeTime: number,
    defenseTime: number
}

export type Gameplay = {
    players: GameplayPlayer[],
    displayRoles: boolean,
    config: Config,
}