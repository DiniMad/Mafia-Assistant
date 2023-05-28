import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/nightActionMachine";
import {useActor} from "@xstate/react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import {useEffect} from "react";

export default (actor: ActorRef<Event, State<Context, Event>>) => {
    const [state, send] = useActor(actor);
    
    useEffect(()=>{
        console.log(state.context.nightActions);},[state.context])

    const actedOnPlayers = state.context.actedOnPlayers;
    const actingPlayers = state.context.actingPlayers;
    const isInQueue = state.matches("queue");
    const popup = state.context.announcement !== undefined;
    const announcement = state.context.announcement;
    const mafiaAct =
        state.context.actingPlayer?.roleSide === "Mafia" ? state.context.mafiaAct : undefined;

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
        next,
        selectPlayer,
        chooseFromMultiAnswer,
    } as const;
}