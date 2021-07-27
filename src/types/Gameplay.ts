import {ExclusivePersistentProperties, PersistentPlayer, PersistentPlayerRole} from "./PersistentData";
import {TalkQueue} from "./TalkQueue";

export type GameplayPlayerRole = Omit<PersistentPlayerRole, keyof ExclusivePersistentProperties | "variety"> & {
    revealed: boolean,
}

export type GameplayPlayer = Omit<PersistentPlayer, keyof ExclusivePersistentProperties> & {
    role: GameplayPlayerRole,
    active: boolean,
}

export type Talk = {
    playerId: GameplayPlayer["id"],
    type: "discus" | "challenge" | "defence",
}

export type Config = {
    talkTime: number,
    challengeTime: number,
    defenseTime: number
}

export type Gameplay = {
    players: GameplayPlayer[],
    displayRoles: boolean,
    talkQueue: TalkQueue,
    config: Config,
}