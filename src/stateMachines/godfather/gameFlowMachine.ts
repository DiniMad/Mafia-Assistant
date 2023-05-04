import {ActorRef, assign, createMachine, spawn, State} from "xstate";
import {
    dayTalkMachine,
    Event as DayTalkEvent,
    Context as DayTalkContext,
} from "@/stateMachines/godfather/dayTalkMachine";
import appRoutes from "@/utilites/appRoutes";

type Context = {
    appRoute: string,
    dayTalkMachineOptions: typeof dayTalkMachine.options,
    dayTalkMachine: ActorRef<DayTalkEvent, State<DayTalkContext, DayTalkEvent>>,
}

export const gameFlowMachine = createMachine<Context>({
    id: "gameFlow",
    initial: "dayTalk",
    states: {
        dayTalk: {
            entry: assign({
                dayTalkMachine: (context) => spawn(dayTalkMachine.withConfig(context.dayTalkMachineOptions)),
                appRoute: () => appRoutes.godfather.gameFlow.pathTo(appRoutes.godfather.gameFlow.dayTalk),
            }),
        },
        voting: {},
        elimination: {},
        nightAction: {},
        nightAnnouncement: {},
        end: {},
    },
});