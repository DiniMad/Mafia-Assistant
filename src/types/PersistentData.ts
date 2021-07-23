export type ExclusivePersistentProperties = {
    selected: boolean,
}

export type PersistentPlayer = ExclusivePersistentProperties & {
    id: string,
    name: string,
}

export type PersistentPlayerRole = ExclusivePersistentProperties & {
    name: string,
    shortName: string,
    side: "Mafia" | "Citizen",
    variety: "One" | "Many",
}