import {assign, createMachine, send, sendParent} from "xstate";
import {ELIMINATION_CARD_KEYS, EliminationCard, GodfatherPlayer} from "@/types/godfatherGame";
import {shuffleArray} from "@/utilites/arrayUtils";
import {pure} from "xstate/lib/actions";
import {RequireAtLeastOne} from "@/types/utilities";

type AnnouncementTitle = `card-guid-title-${EliminationCard["key"]}`;
type AnnouncementDetail = `card-guid-detail-${EliminationCard["key"]}` | {
    [K in EliminationCard["key"]]:
    K extends "FACE_OFF" | "REVEAL_IDENTITY" ? never :
        K extends "BEAUTIFUL_MIND" ? `card-result-${K}-${"right" | "wrong"}` :
            `card-result-${K}`
}[EliminationCard["key"]]
export type Context = {
    playerToEliminate: GodfatherPlayer,
    cardKeys: EliminationCard["key"][],
    players: (GodfatherPlayer & { selected?: boolean })[],
    announcement?: RequireAtLeastOne<{
        title?: AnnouncementTitle,
        description?: AnnouncementDetail,
        descriptionProp?: `role-${GodfatherPlayer["roleKey"]}`,
    }>,
    usedCard?: EliminationCard["key"]
};

type InitializeEvent = {
    type: "INITIALIZE",
    playerToEliminate: GodfatherPlayer,
    players: GodfatherPlayer[],
    cardKeys: EliminationCard["key"][],
};
type DoneEvent = { type: "DONE" };
type SelectCardEvent = { type: "SELECT_CARD", index: number };
type SelectPlayerEvent = { type: "SELECT_PLAYER", playerId: GodfatherPlayer["id"] };
type NextEvent = { type: "NEXT" };
type SilenceEvent = { type: Uppercase<typeof ELIMINATION_CARD_KEYS[0]> };
type RevealIdentityEvent = { type: "REVEAL_IDENTITY" };
type BeautifulMindEvent = { type: "BEAUTIFUL_MIND" };
type DisableAbilityEvent = { type: "DISABLE_ABILITY", playerToDisable: GodfatherPlayer["id"] };
type FaceOffEvent = { type: "FACE_OFF", playerToAct: GodfatherPlayer["id"] };
export type Event =
    InitializeEvent |
    DoneEvent |
    SelectCardEvent |
    SelectPlayerEvent |
    NextEvent |
    SilenceEvent |
    RevealIdentityEvent |
    BeautifulMindEvent |
    DisableAbilityEvent |
    FaceOffEvent;

export const eliminationMachine = createMachine<Context, Event>(
    {
        predictableActionArguments: true,
        id: "elimination",
        initial: "uninitialized",
        context: {
            playerToEliminate: {} as GodfatherPlayer,
            cardKeys: [],
            players: [],
        },
        states: {
            uninitialized: {
                on: {
                    INITIALIZE: {
                        actions: [
                            "assignPlayerToEliminate",
                            "assignShuffledCardKeys",
                            "assignPlayers",
                        ],
                        target: "elimination",
                    },
                },
            },
            elimination: {
                on: {
                    SELECT_CARD: {
                        actions: "sendEventAssociatedWithCard",
                    },
                    SILENCE: "silence",
                    REVEAL_IDENTITY: {
                        actions: [
                            "assignUsedCardToRevealIdentity",
                            "assignAnnouncementToRevealIdentityGuid",
                            "sendEliminateEventToParentWithPlayerToEliminate",
                        ],
                        target: "finish",
                    },
                    BEAUTIFUL_MIND: "beautifulMind",
                    DISABLE_ABILITY: "disableAbility",
                    FACE_OFF: {
                        actions: [
                            "assignUsedCardToFaceOff",
                            "assignAnnouncementToFaceOffGuid",
                            "sendEliminateEventToParentWithPlayerToEliminate",
                        ],
                        target: "finish",
                    },
                },
            },
            silence: {
                entry: "assignUsedCardToSilence",
                initial: "guid",
                states: {
                    guid: {
                        entry: "assignAnnouncementToSilenceGuid",
                        on: {
                            DONE: "playerSelection",
                        },
                        exit: "assignAnnouncementToUndefined",
                    },
                    playerSelection: {
                        on: {
                            SELECT_PLAYER: {
                                cond: "playerToEliminateIsNotAmongSelectedPlayers",
                                actions: "toggleEventPlayerSelected",
                            },
                            NEXT: {
                                cond: "twoPlayersSelected",
                                actions: [
                                    "sendSilenceEventToParent",
                                    "sendEliminateEventToParentWithPlayerToEliminate",
                                    "assignAnnouncementToSilenceResult",
                                ],
                                target: "#elimination.finish",
                            },
                        },
                    },
                },
            },
            beautifulMind: {
                entry: "assignUsedCardToBeautifulMind",
                initial: "guid",
                states: {
                    guid: {
                        entry: "assignAnnouncementToBeautifulMindGuid",
                        on: {
                            DONE: "playerSelection",
                        },
                        exit: "assignAnnouncementToUndefined",
                    },
                    playerSelection: {
                        on: {
                            SELECT_PLAYER: {
                                actions: "toggleEventPlayerSelected",
                            },
                            NEXT: [
                                {
                                    cond: "selectedPlayersCountIsNotOne",
                                },
                                {
                                    cond: "guessIsRight",
                                    actions: [
                                        "sendEliminateEventToParentWithSelectedPlayer",
                                        "assignAnnouncementToBeautifulMindRightGuess",
                                    ],
                                    target: "#elimination.finish",
                                },
                                {
                                    actions: [
                                        "sendEliminateEventToParentWithPlayerToEliminate",
                                        "assignAnnouncementToBeautifulMindWrongGuess",
                                    ],
                                    target: "#elimination.finish",
                                },
                            ],
                        },
                    },
                },
            },
            disableAbility: {
                entry: "assignUsedCardToDisableAbility",
                initial: "guid",
                states: {
                    guid: {
                        entry: "assignAnnouncementToDisableAbilityGuid",
                        on: {
                            DONE: "playerSelection",
                        },
                        exit: "assignAnnouncementToUndefined",
                    },
                    playerSelection: {
                        on: {
                            SELECT_PLAYER: {
                                cond: "playerToEliminateIsNotAmongSelectedPlayers",
                                actions: "toggleEventPlayerSelected",
                            },
                            NEXT: {
                                cond: "onePlayerSelected",
                                actions: [
                                    "sendDisableAbilityEventToParent",
                                    "sendEliminateEventToParentWithPlayerToEliminate",
                                    "assignAnnouncementToDisableAbility",
                                ],
                                target: "#elimination.finish",
                            },
                        },
                    },
                },
            },
            finish: {
                on: {
                    DONE: {
                        actions: "sendEndEventToParent",
                    },
                },
            },
        },
    },
    {
        guards: {
            guessIsRight: ctx => {
                const player =
                    ctx.players.find(p => p.selected);
                if (player === undefined) throw Error();

                return player.roleKey === "nostradamus";
            },
            playerToEliminateIsNotAmongSelectedPlayers: ctx => {
                return ctx.players.find(p => !!p.selected && p.id === ctx
                    .playerToEliminate.id) === undefined;
            },
            selectedPlayersCountIsNotOne: ctx => {
                return ctx.players.filter(p => !!p.selected).length !== 1;
            },
            onePlayerSelected: ctx => {
                return ctx.players.filter(p => !!p.selected).length === 1;
            },
            twoPlayersSelected: ctx => {
                return ctx.players.filter(p => !!p.selected).length === 2;
            },
        },
        actions: {
            assignPlayerToEliminate: assign({
                playerToEliminate: (_, e: InitializeEvent) => e.playerToEliminate,
            }),
            assignShuffledCardKeys: assign({
                cardKeys: (_, e: InitializeEvent) => shuffleArray(e.cardKeys),
            }),
            assignPlayers: assign({
                players: (_, e: InitializeEvent) => e.players,
            }),
            toggleEventPlayerSelected: assign({
                players: (ctx, e: SelectPlayerEvent) => {
                    return ctx.players.map(p =>
                        p.id === e.playerId ? {...p, selected: !p.selected} : p);
                },
            }),
            assignAnnouncementToSilenceGuid: assign({
                announcement: () => ({
                    title: "card-guid-title-SILENCE",
                    description: "card-guid-detail-SILENCE",
                }),
            }),
            assignAnnouncementToBeautifulMindGuid: assign({
                announcement: () => ({
                    title: "card-guid-title-BEAUTIFUL_MIND",
                    description: "card-guid-detail-BEAUTIFUL_MIND",
                }),
            }),
            assignAnnouncementToDisableAbilityGuid: assign({
                announcement: () => ({
                    title: "card-guid-title-DISABLE_ABILITY",
                    description: "card-guid-detail-DISABLE_ABILITY",
                }),
            }),
            assignAnnouncementToFaceOffGuid: assign({
                announcement: () => ({
                    title: "card-guid-title-FACE_OFF",
                    description: "card-guid-detail-FACE_OFF",
                }),
            }),
            assignAnnouncementToRevealIdentityGuid: assign({
                announcement: (ctx) => ({
                    title: "card-guid-title-REVEAL_IDENTITY",
                    description: "card-guid-detail-REVEAL_IDENTITY",
                    descriptionProp: `role-${ctx.playerToEliminate.roleKey}`,
                }),
            }),
            assignAnnouncementToSilenceResult: assign({
                announcement: () => ({
                    title: "card-guid-title-SILENCE",
                    description: "card-result-SILENCE",
                }),
            }),
            assignAnnouncementToBeautifulMindRightGuess: assign({
                announcement: () => ({
                    title: "card-guid-title-BEAUTIFUL_MIND",
                    description: "card-result-BEAUTIFUL_MIND-right",
                }),
            }),
            assignAnnouncementToBeautifulMindWrongGuess: assign({
                announcement: () => ({
                    title: "card-guid-title-BEAUTIFUL_MIND",
                    description: "card-result-BEAUTIFUL_MIND-wrong",
                }),
            }),
            assignAnnouncementToDisableAbility: assign({
                announcement: () => ({
                    title: "card-guid-title-DISABLE_ABILITY",
                    description: "card-result-DISABLE_ABILITY",
                }),
            }),
            assignAnnouncementToUndefined: assign({
                announcement: () => undefined,
            }),
            assignUsedCardToSilence: assign({
                usedCard: () => "SILENCE",
            }),
            assignUsedCardToRevealIdentity: assign({
                usedCard: () => "REVEAL_IDENTITY",
            }),
            assignUsedCardToBeautifulMind: assign({
                usedCard: () => "BEAUTIFUL_MIND",
            }),
            assignUsedCardToDisableAbility: assign({
                usedCard: () => "DISABLE_ABILITY",
            }),
            assignUsedCardToFaceOff: assign({
                usedCard: () => "FACE_OFF",
            }),
            sendEventAssociatedWithCard: pure((ctx, e: SelectCardEvent) => send(ctx.cardKeys[e.index])),
            sendSilenceEventToParent: sendParent(ctx => ({
                type: "SILENCE",
                players: ctx.players.filter(p => p.selected),
            })),
            sendEliminateEventToParentWithSelectedPlayer: sendParent(ctx => ({
                type: "ELIMINATE",
                playerId: ctx.players.find(p => p.selected)!.id,
            })),
            sendEliminateEventToParentWithPlayerToEliminate: sendParent(ctx => ({
                type: "ELIMINATE",
                playerId: ctx.playerToEliminate,
            })),
            sendDisableAbilityEventToParent: sendParent(ctx => ({
                type: "DISABLE_ABILITY",
                playerId: ctx.players.find(p => p.selected)!.id,
            })),
            sendFaceOffEventToParent: sendParent(ctx => ({type: "FACE_OFF", playerToAct: ctx.playerToEliminate})),
            sendEndEventToParent: sendParent(ctx => ({type: "ELIMINATION_END", usedCard: ctx.usedCard})),
        },
    });