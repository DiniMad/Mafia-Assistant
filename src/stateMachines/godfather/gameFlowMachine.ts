import {ActorRef, assign, createMachine, sendTo, spawn, State} from "xstate";
import {
    talkingMachine,
    Event as TalkingEvent,
    Context as TalkingContext,
} from "@/stateMachines/godfather/talkingMachine";
import {
    votingMachine,
    Event as VotingEvent,
    Context as VotingContext,
} from "@/stateMachines/godfather/votingMachine";
import {
    eliminationMachine,
    Event as EliminationEvent,
    Context as EliminationContext,
} from "@/stateMachines/godfather/eliminationMachine";
import {
    nightActionMachine,
    Event as NightActionEvent,
    Context as NightActionContext,
} from "@/stateMachines/godfather/nightActionMachine";
import appRoutes from "@/utilites/appRoutes";
import {
    DisableAbilityAct,
    EliminationCard,
    FaceOffAct,
    GodfatherPlayer,
    NightAction,
} from "@/types/godfatherGame";

export type Context = {
    appRoute: string,
    players: GodfatherPlayer[],
    playersToTalk: GodfatherPlayer[],
    playersToExcludeFromTalk: GodfatherPlayer[],
    playersToVoteOn: GodfatherPlayer[],
    playersToEliminate: GodfatherPlayer[],
    eliminationCards: EliminationCard[],
    nightActions: NightAction[],
    talkingMachine: ActorRef<TalkingEvent, State<TalkingContext, TalkingEvent>>,
    talkingMachineOptions: typeof talkingMachine.options,
    votingMachine: ActorRef<VotingEvent, State<VotingContext, VotingEvent>>,
    eliminationMachine: ActorRef<EliminationEvent, State<EliminationContext, EliminationEvent>>,
    nightActionMachine: ActorRef<NightActionEvent, State<NightActionContext, NightActionEvent>>,
}

export type InitializeEvent = { type: "INITIALIZE", players: GodfatherPlayer[] };
export type TalkingEndEvent = { type: "TALKING_END" };
export type VotingEndEvent = { type: "VOTING_END", playersWithTheVote: GodfatherPlayer["id"][] };
export type EliminationEndEvent = { type: "ELIMINATION_END", usedCard: EliminationCard["key"] };
export type NightActionEndEvent = { type: "NIGHT_ACTION_END", nightActions: NightAction[] };
export type SilenceEvent = { type: "SILENCE", players: [GodfatherPlayer["id"], GodfatherPlayer["id"]] };
export type DisableAbilityEvent = { type: "DISABLE_ABILITY", playerId: GodfatherPlayer["id"] };
export type FaceOffEvent = { type: "FACE_OFF", playerToAct: GodfatherPlayer["id"] };
export type SwapRolesEvent = { type: "SWAP_ROLES", players: [GodfatherPlayer["id"], GodfatherPlayer["id"]] };
export type EliminateEvent = { type: "ELIMINATE", playerId: GodfatherPlayer["id"] };
export type Event =
    InitializeEvent
    | TalkingEndEvent
    | VotingEndEvent
    | EliminationEndEvent
    | NightActionEndEvent
    | SilenceEvent
    | DisableAbilityEvent
    | FaceOffEvent
    | SwapRolesEvent
    | EliminateEvent;

export const gameFlowMachine = createMachine<Context, Event>({
        predictableActionArguments: true,
        id: "gameFlow",
        initial: "uninitialized",
        states: {
            uninitialized: {
                on: {
                    INITIALIZE: {
                        actions: [
                            "assignPlayers",
                            "assignPlayersToPlayersToTalk",
                        ],
                        target: "nightAction",
                    },
                },
            },
            dayTalk: {
                entry: [
                    "spawnTalkingMachine",
                    "assignAppRouteToTalkRoomPath",
                    "sendInitializeEventToTalkingActor",
                ],
                on: {
                    TALKING_END: {
                        actions: "assignPlayersToVoteOn",
                        target: "voting",
                    },
                },
            },
            voting: {
                entry: [
                    "spawnVotingMachine",
                    "assignAppRouteToVotingPath",
                    "sendInitializeEventToVotingActor",
                ],
                on: {
                    VOTING_END: [
                        {
                            cond: "playersWithTheVoteNotEmpty",
                            actions: "assignEventPlayersWithTheVoteToPlayersToTalk",
                            target: "defenceTalk",
                        },
                        {
                            target: "nightAction",
                        },
                    ],
                },
            },
            defenceTalk: {
                entry: [
                    "spawnTalkingMachine",
                    "assignAppRouteToTalkRoomPath",
                    "sendInitializeEventToTalkingActor",
                ],
                on: {
                    TALKING_END: {
                        actions: "assignPlayersToTalkToPlayersToVoteOn",
                        target: "eliminationVoting",
                    },
                },
            },
            eliminationVoting: {
                entry: [
                    "spawnVotingMachine",
                    "assignAppRouteToVotingPath",
                    "sendInitializeEventToVotingActor",
                ],
                on: {
                    VOTING_END: [
                        {
                            cond: "playersWithTheVoteNotEmpty",
                            actions: "assignEventPlayersWithTheVoteToPlayersToEliminate",
                            target: "elimination",
                        },
                        {
                            target: "nightAction",
                        },
                    ],
                },
            },
            elimination: {
                entry: [
                    "spawnEliminationMachine",
                    "assignAppRouteToEliminationPath",
                    "sendInitializeEventToEliminationActor",
                ],
                on: {
                    SILENCE: {
                        actions: "addEventPlayerToPlayersToExcludeFromTalk",
                    },
                    DISABLE_ABILITY: {
                        actions: "addDisableAbilityToNightActionList",
                    },
                    FACE_OFF: {
                        actions: "addFaceOffToNightActionList",
                    },
                    ELIMINATION_END: {
                        actions: "setUsedCardAvailabilityToFalse",
                        target: "nightAction",
                    },
                },
            },
            nightAction: {
                entry: [
                    "spawnNightActionMachine",
                    "assignAppRouteToNightActionPath",
                    "sendInitializeEventToNightActionActor",
                ],
                on: {
                    NIGHT_ACTION_END: {
                        actions: "addNightActionsToExistingNightActions",
                        target: "nightAnnouncement",
                    },
                },
            },
            nightAnnouncement: {
                entry: [
                    "assignAppRouteToNightAnnouncementPath",
                ],
            },
            end: {},
        },
        on: {
            SWAP_ROLES: {
                actions: "swapRoles",
            },
            ELIMINATE: {
                actions: "eliminatePlayer",
            },
        },
    },
    {
        guards: {
            playersWithTheVoteNotEmpty: (_, e) => {
                if (e.type !== "VOTING_END") throw Error();

                return e.playersWithTheVote.length > 0;
            },
        },
        actions: {
            assignPlayers: assign({
                players: (_, e: InitializeEvent) => e.players,
            }),
            assignPlayersToPlayersToTalk: assign({
                playersToTalk: (ctx) => ctx.players.filter(p => !p.eliminated),
            }),
            spawnTalkingMachine: assign({
                talkingMachine: ctx => spawn(talkingMachine.withConfig(ctx.talkingMachineOptions)),
            }),
            assignAppRouteToTalkRoomPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.talkRoom),
            }),
            sendInitializeEventToTalkingActor: sendTo(
                ctx => ctx.talkingMachine,
                ctx => ({type: "INITIALIZE", players: ctx.playersToTalk})),
            assignPlayersToVoteOn: assign({
                playersToVoteOn: ctx => ctx.players.filter(p => !p.eliminated),
            }),
            spawnVotingMachine: assign({
                votingMachine: () => spawn(votingMachine),
            }),
            assignAppRouteToVotingPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.voting),
            }),
            sendInitializeEventToVotingActor: sendTo(
                ctx => ctx.votingMachine,
                ctx => ({type: "INITIALIZE", players: ctx.playersToVoteOn})),
            assignEventPlayersWithTheVoteToPlayersToTalk: assign({
                playersToTalk: (ctx, e: VotingEndEvent) => ctx.players.filter(p => e.playersWithTheVote.includes(p.id)),
            }),
            assignPlayersToTalkToPlayersToVoteOn: assign({
                playersToVoteOn: ctx => ctx.playersToTalk,
            }),
            assignEventPlayersWithTheVoteToPlayersToEliminate: assign({
                playersToEliminate: (ctx, e: VotingEndEvent) => ctx.players.filter(p => e.playersWithTheVote.includes(p.id)),
            }),
            spawnEliminationMachine: assign({
                eliminationMachine: () => spawn(eliminationMachine),
            }),
            assignAppRouteToEliminationPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.elimination),
            }),
            sendInitializeEventToEliminationActor: sendTo(
                ctx => ctx.eliminationMachine,
                ctx => ({
                    type: "INITIALIZE",
                    playerToEliminate: ctx.playersToEliminate[0],
                    cardKeys: ctx.eliminationCards
                        .filter(c => c.available)
                        .map(c => c.key),
                    players: ctx.players.filter(p => !p.eliminated),
                })),
            spawnNightActionMachine: assign({
                nightActionMachine: () => spawn(nightActionMachine),
            }),
            assignAppRouteToNightActionPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.nightAction),
            }),
            sendInitializeEventToNightActionActor: sendTo(
                ctx => ctx.nightActionMachine,
                ctx => ({
                    type: "INITIALIZE",
                    actedOnPlayers: ctx.players,
                    actingPlayers: ctx.players.filter(p => !p.eliminated),
                })),
            addNightActionsToExistingNightActions: assign({
                nightActions: (ctx, e: NightActionEndEvent) =>
                    [...ctx.nightActions || [], ...e.nightActions],
            }),
            assignAppRouteToNightAnnouncementPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.nightAnnouncement),
            }),
            addEventPlayerToPlayersToExcludeFromTalk: assign({
                playersToExcludeFromTalk: (ctx, e: SilenceEvent) => {
                    const player = ctx.players.filter(p => e.players.includes(p.id));
                    if (player === undefined) throw Error;

                    return [...ctx.playersToExcludeFromTalk || [], ...player];
                },
            }),
            addDisableAbilityToNightActionList: assign({
                nightActions: (ctx, e: DisableAbilityEvent) => {
                    const action: DisableAbilityAct =
                        {action: "DISABLE_ABILITY", player: e.playerId};
                    return [...ctx.nightActions || [], action];
                },
            }),
            addFaceOffToNightActionList: assign({
                nightActions: (ctx, e: FaceOffEvent) => {
                    const action: FaceOffAct =
                        {action: "FACE_OFF", playerToAct: e.playerToAct};
                    return [...ctx.nightActions, action];
                },
            }),
            setUsedCardAvailabilityToFalse: assign({
                eliminationCards: (ctx, e: EliminationEndEvent) =>
                    ctx.eliminationCards.map(c =>
                        c.key === e.usedCard ? {...c, available: false} : c),
            }),
            swapRoles: assign({
                players: (ctx, e: SwapRolesEvent) => {
                    const p1Index = ctx.players.findIndex(p => p.id === e.players[0]);
                    const p2Index = ctx.players.findIndex(p => p.id === e.players[1]);
                    if (p1Index === -1 || p2Index === -1) throw Error();

                    const tempPlayer = ctx.players[p1Index];
                    ctx.players[p1Index] = ctx.players[p2Index];
                    ctx.players[p2Index] = tempPlayer;

                    return ctx.players;
                },
            }),
            eliminatePlayer: assign({
                players: (ctx, e: EliminateEvent) => {
                    return ctx.players.map(p =>
                        p.id === e.playerId ? {...p, eliminated: true} : p);
                },
            }),
        },
    });