import {useActor} from "@xstate/react";
import {Context, Event} from "@/stateMachines/godfather/dayTalkMachine";
import {GodfatherPlayer} from "@/types/godfatherGame";
import {ActorRef, State} from "xstate";

export default (actor: ActorRef<Event, State<Context, Event>>) => {
    const [state, send] = useActor(actor);

    const challengeTime = state.machine?.options.delays!["challengeTime"] as number;
    const talkTime = state.machine?.options.delays!["talkTime"] as number;

    const players = state.context.players;
    const talkingPlayer = players.find(p => p.id === state.context.talkingPlayer);
    const remainingTime =
        state.matches("challenge") ?
            ((challengeTime / 1000) - state.context.elapsedTime) :
            ((talkTime / 1000) - state.context.elapsedTime);
    const openStartPopup = state.matches("ready");
    const isDone = state.matches("finish");
    const challengeAvailable = state.context.challengeAvailable;

    const start = () => send({type: "START"});
    const next = () => send({type: "NEXT"});
    const challengeNow = (challengerId: GodfatherPlayer["id"]) =>
        send({type: "CHALLENGE_NOW", playerId: challengerId});
    const challengeNext = (challengerId: GodfatherPlayer["id"]) =>
        send({type: "CHALLENGE_NEXT", playerId: challengerId});


    return {
        players,
        talkingPlayer,
        remainingTime,
        openStartPopup,
        isDone,
        challengeAvailable,
        start,
        next,
        challengeNow,
        challengeNext,
    } as const;
}