import {GodfatherRoleType} from "@/store/roles";

export type GodfatherPlayer = {
    readonly id: string,
    readonly name: string,
    readonly roleKey: GodfatherRoleType["key"],
    readonly roleSide: GodfatherRoleType["side"],
    roleRevealed: boolean,
    eliminated: boolean,
}
export type Role<T extends GodfatherPlayer["roleKey"]> = Extract<GodfatherPlayer["roleKey"], T>

export const ELIMINATION_CARD_KEYS = ["SILENCE", "REVEAL_IDENTITY", "BEAUTIFUL_MIND", "DISABLE_ABILITY", "FACE_OFF"] as const;
export type EliminationCard = {
    key: typeof ELIMINATION_CARD_KEYS[number],
    available: boolean,
}

export type DisableAbilityAct = { action: "DISABLE_ABILITY"; player: GodfatherPlayer["id"]; }
export type FaceOffAct = { action: "FACE_OFF"; playerToAct: GodfatherPlayer["id"]; }
export type NostradamusAct = {
    action: "NOSTRADAMUS";
    choices: GodfatherPlayer[],
    numberOfMafiasExceptGodfather: number,
    sideChoices: readonly [
        Lowercase<Extract<GodfatherPlayer["roleSide"], "Mafia">>,
    ] | readonly[
        Lowercase<Extract<GodfatherPlayer["roleSide"], "Mafia">>,
        Lowercase<Extract<GodfatherPlayer["roleSide"], "Citizen">>
    ],
    sideChoice?: Lowercase<Extract<GodfatherPlayer["roleSide"], "Mafia" | "Citizen">>
}
export type GodfatherShotAct = {
    action: "GODFATHER";
    choice: "shot";
    player: GodfatherPlayer["id"]
};
export type Godfather6SenseAct = {
    action: "GODFATHER";
    choice: "6sense";
    player: GodfatherPlayer["id"];
    roleGuess: `role-${GodfatherPlayer["roleKey"]}`
};
export type GodfatherAct = GodfatherShotAct | Godfather6SenseAct;
export type SaulAct = { action: "SAUL"; player: GodfatherPlayer["id"] };
export type MatadorAct = { action: "MATADOR"; player: GodfatherPlayer["id"] };
export type WatsonAct = { action: "WATSON"; players: GodfatherPlayer["id"][] };
export type LeonAct = { action: "LEON"; player: GodfatherPlayer["id"] };
export type KaneAct = { action: "KANE"; player: GodfatherPlayer["id"] };
export type ConstantinAct = { action: "CONSTANTIN"; player: GodfatherPlayer["id"] };
export type NightAction =
    DisableAbilityAct |
    FaceOffAct |
    NostradamusAct |
    GodfatherAct |
    SaulAct |
    MatadorAct |
    WatsonAct |
    LeonAct |
    KaneAct |
    ConstantinAct

const isNostradamusAct = (act: NightAction): act is NostradamusAct =>
    act.action === "NOSTRADAMUS";
const isGodfatherAct = (act: NightAction): act is GodfatherAct =>
    act.action === "GODFATHER";
const isSaulAct = (act: NightAction): act is SaulAct =>
    act.action === "SAUL";
const isMatadorAct = (act: NightAction): act is MatadorAct =>
    act.action === "MATADOR";
const isWatsonAct = (act: NightAction): act is  WatsonAct =>
    act.action === "WATSON";
const isLeonAct = (act: NightAction): act is  LeonAct =>
    act.action === "LEON";
const isKaneAct = (act: NightAction): act is  KaneAct =>
    act.action === "KANE";
const isConstantinAct = (act: NightAction): act is  ConstantinAct =>
    act.action === "CONSTANTIN";
export const guards = {
    isNostradamusAct,
    isGodfatherAct,
    isSaulAct,
    isMatadorAct,
    isWatsonAct,
    isLeonAct,
    isKaneAct,
    isConstantinAct,
};