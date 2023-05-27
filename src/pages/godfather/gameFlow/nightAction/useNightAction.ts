import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/nightActionMachine";
import {useActor} from "@xstate/react";
import {GodfatherPlayer} from "@/types/godfatherGame";

export default (actor: ActorRef<Event, State<Context, Event>>) => {
    const [state, send] = useActor(actor);

    const actedOnPlayers = state.context.actedOnPlayers;
    const actingPlayers = state.context.actingPlayers;
    const isInQueue = state.matches("queue");
    const popup = state.context.announcement !== undefined;
    const announcement = state.context.announcement;
    const mafiaAct = state.context.mafiaAct;
    const revealMafiaAct = state.context.revealMafiaAct;

    const next = () => send({type: "NEXT"});
    const selectPlayer = (player: GodfatherPlayer["id"]) => send({type: "SELECT_PLAYER", player});
    const chooseFromMultiAnswer = (choiceIndex: number) => send({type: "CHOSEN_MULTI_ANSWER", choiceIndex});

    return {
        actedOnPlayers,
        actingPlayers,
        isInQueue,
        popup,
        announcement,
        mafiaAct,
        revealMafiaAct,
        next,
        selectPlayer,
        chooseFromMultiAnswer,
    } as const;
}