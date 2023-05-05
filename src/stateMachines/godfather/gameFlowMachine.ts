import {ActorRef, assign, createMachine, sendTo, spawn, State} from "xstate";
import {
    dayTalkMachine,
    Event as DayTalkEvent,
    Context as DayTalkContext,
} from "@/stateMachines/godfather/dayTalkMachine";
import appRoutes from "@/utilites/appRoutes";
import {GodfatherPlayer} from "@/types/godfatherGame";

type Context = {
    appRoute: string,
    players: GodfatherPlayer[],
    dayTalkMachineOptions: typeof dayTalkMachine.options,
    dayTalkMachine: ActorRef<DayTalkEvent, State<DayTalkContext, DayTalkEvent>>,
}

export type InitializeEvent = { type: "INITIALIZE", players: GodfatherPlayer[] };
export type DayTalkEndEvent = { type: "DAY_TALK_END" };
type Event = InitializeEvent | DayTalkEndEvent;

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
                    "assignAppRoute",
                    "sendInitializeEventToDayTalkActor",
                ],
                on: {
                    DAY_TALK_END: "voting",
                },
            },
            voting: {
                entry: assign({
                    appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.voting),
                }),
            },
            elimination: {},
            nightAction: {},
            nightAnnouncement: {},
            end: {},
        },
    },
    {
        actions: {
            assignPlayers: (_, e: InitializeEvent) => e.players,
            spawnDayTalkMachine: assign({
                dayTalkMachine: (ctx) => spawn(dayTalkMachine.withConfig(ctx.dayTalkMachineOptions)),
            }),
            assignAppRoute: assign({
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.dayTalk),
            }),
            sendInitializeEventToDayTalkActor: sendTo(ctx => ctx.dayTalkMachine,
                ctx => ({type: "INITIALIZE", players: ctx.players})),
        },
    });