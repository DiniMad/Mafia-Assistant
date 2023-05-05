import {
    ActorRef,
    assign,
    createMachine,
    InternalMachineOptions,
    sendTo,
    spawn,
    State,
    StateMachine,
} from "xstate";
import {
    dayTalkMachine,
    Event as DayTalkEvent,
    Context as DayTalkContext,
} from "@/stateMachines/godfather/dayTalkMachine";
import {
    votingMachine,
    Event as VotingEvent,
    Context as VotingContext,
} from "@/stateMachines/godfather/votingMachine";
import appRoutes from "@/utilites/appRoutes";
import {GodfatherPlayer} from "@/types/godfatherGame";

type Context = {
    appRoute: string,
    players: GodfatherPlayer[],
    playersToDefence: GodfatherPlayer["id"][],
    dayTalkMachine: ActorRef<DayTalkEvent, State<DayTalkContext, DayTalkEvent>>,
    dayTalkMachineOptions: typeof dayTalkMachine.options,
    votingMachine: ActorRef<VotingEvent, State<VotingContext, VotingEvent>>,
}

export type InitializeEvent = { type: "INITIALIZE", players: GodfatherPlayer[] };
export type DayTalkEndEvent = { type: "DAY_TALK_END" };
export type VotingEndEvent = { type: "VOTING_END", playersToDefence: GodfatherPlayer["id"][] };
type Event = InitializeEvent | DayTalkEndEvent | VotingEndEvent;

export const gameFlowMachine = createMachine<Context, Event>({
        predictableActionArguments: true,
        id: "gameFlow",
        initial: "uninitialized",
        states: {
            uninitialized: {
                on: {
                    INITIALIZE: {
                        actions: "assignPlayers",
                        target: "dayTalk",
                    },
                },
            },
            dayTalk: {
                entry: [
                    "spawnDayTalkMachine",
                    "assignAppRouteToDayTalkPath",
                    "sendInitializeEventToDayTalkActor",
                ],
                on: {
                    DAY_TALK_END: "voting",
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
                            actions: "assignPlayerToDefence",
                            target: "defenceTalk",
                        },
                        {
                            target: "nightAction",
                        },
                    ],
                },
            },
            defenceTalk: {},
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
            spawnDayTalkMachine: assign({
                dayTalkMachine: ctx => spawn(dayTalkMachine.withConfig(ctx.dayTalkMachineOptions)),
            }),
            assignAppRouteToDayTalkPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.dayTalk),
            }),
            sendInitializeEventToDayTalkActor: sendTo(
                ctx => ctx.dayTalkMachine,
                ctx => ({type: "INITIALIZE", players: ctx.players})),
            spawnVotingMachine: assign({
                votingMachine: () => spawn(votingMachine),
            }),
            assignAppRouteToVotingPath: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.voting),
            }),
            sendInitializeEventToVotingActor: sendTo(
                ctx => ctx.votingMachine,
                ctx => ({type: "INITIALIZE", players: ctx.players})),
            assignPlayerToDefence: assign({
                playersToDefence: (_, e: VotingEndEvent) => e.playersToDefence,
            }),
        },
    });