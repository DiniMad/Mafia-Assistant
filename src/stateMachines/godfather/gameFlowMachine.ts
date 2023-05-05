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
import appRoutes from "@/utilites/appRoutes";
import {GodfatherPlayer} from "@/types/godfatherGame";

export type Context = {
    appRoute: string,
    players: GodfatherPlayer[],
    playersToTalk: GodfatherPlayer[],
    talkingMachine: ActorRef<TalkingEvent, State<TalkingContext, TalkingEvent>>,
    talkingMachineOptions: typeof talkingMachine.options,
    votingMachine: ActorRef<VotingEvent, State<VotingContext, VotingEvent>>,
}

export type InitializeEvent = { type: "INITIALIZE", players: GodfatherPlayer[] };
export type TalkingEndEvent = { type: "TALKING_END" };
export type VotingEndEvent = { type: "VOTING_END", playersToDefence: GodfatherPlayer["id"][] };
export type Event = InitializeEvent | TalkingEndEvent | VotingEndEvent;

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
                        target: "dayTalk",
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
                    TALKING_END: "voting",
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
                            cond: "playerToDefenceNotEmpty",
                            actions: "assignEventPlayersToDefenceToPlayersToTalk",
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
            },
            elimination: {},
            nightAction: {},
            nightAnnouncement: {},
            end: {},
        },
    },
    {
        guards: {
            playerToDefenceNotEmpty: (_, e) => {
                if (e.type !== "VOTING_END") throw Error();

                return e.playersToDefence.length > 0;
            },
        },
        actions: {
            assignPlayers: assign({
                players: (_, e: InitializeEvent) => e.players,
            }),
            assignPlayersToPlayersToTalk: assign({
                playersToTalk: (ctx) => ctx.players,
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
            spawnVotingMachine: assign({
                votingMachine: () => spawn(votingMachine),
            }),
            assignAppRouteToVotingPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.voting),
            }),
            sendInitializeEventToVotingActor: sendTo(
                ctx => ctx.votingMachine,
                ctx => ({type: "INITIALIZE", players: ctx.players})),
            assignEventPlayersToDefenceToPlayersToTalk: assign({
                playersToTalk: (ctx, e: VotingEndEvent) => ctx.players.filter(p => e.playersToDefence.includes(p.id)),
            }),
        },
    });