import {GodfatherRoleType} from "@/store/roles";

export type GodfatherPlayer = {
    readonly id: string,
    readonly name: string,
    readonly roleKey: GodfatherRoleType["key"],
    readonly roleSide: GodfatherRoleType["side"],
    roleRevealed: boolean,
    eliminated: boolean,
}

export const ELIMINATION_CARD_KEYS = ["SILENCE", "REVEAL_IDENTITY", "BEAUTIFUL_MIND", "DISABLE_ABILITY", "FACE_OFF"] as const;
export type EliminationCard = {
    key: typeof ELIMINATION_CARD_KEYS[number],
    available: boolean,
}

export type DisableAbilityAct = { action: "DISABLE_ABILITY"; player: GodfatherPlayer["id"]; }
export type FaceOffAct = { action: "FACE_OFF"; playerToAct: GodfatherPlayer["id"]; }
export type NightAction = DisableAbilityAct | FaceOffAct;
