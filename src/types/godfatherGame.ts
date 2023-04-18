import {GodfatherRoleType} from "@/store/roles";

export type GodfatherPlayer = {
    readonly id: string,
    readonly name: string,
    readonly roleKey: GodfatherRoleType["key"],
    readonly roleSide: GodfatherRoleType["side"],
    roleRevealed: boolean
}