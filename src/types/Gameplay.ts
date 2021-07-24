import {ExclusivePersistentProperties, PersistentPlayer, PersistentPlayerRole} from "./PersistentData";

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