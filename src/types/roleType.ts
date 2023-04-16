type RoleVarietyOneType = {
    readonly variety: "One",
    readonly count: 1,
}
type RoleVarietyManyType = {
    readonly variety: "Many",
    count: number,
}

type RoleVarietyType = RoleVarietyOneType | RoleVarietyManyType;

export type RoleType<Key extends string, Side extends string> = RoleVarietyType & {
    readonly key: Key,
    readonly side: Side,
    selected?: boolean,
}