export type ExclusivePersistentProperties = {
    selected: boolean,
}

export type PersistentPlayer = ExclusivePersistentProperties & {
    id: string,
    name: string,
}

type PersistentPlayerRoleVarietyOne = {
    readonly variety: "One",
    readonly count: 1,
}
type PersistentPlayerRoleVarietyMany = {
    readonly variety: "Many",
    count: number,
}
export type PersistentPlayerRoleVariety = PersistentPlayerRoleVarietyOne | PersistentPlayerRoleVarietyMany;
export type PersistentPlayerRole = ExclusivePersistentProperties & PersistentPlayerRoleVariety & {
    readonly name: string,
    readonly shortName: string,
    readonly side: "Mafia" | "Citizen",
}