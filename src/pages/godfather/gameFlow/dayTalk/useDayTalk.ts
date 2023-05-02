import {useGodfatherGamePlayers} from "@/store/godfatherGame";
import {useMachine} from "@xstate/react";
import {dayTalkMachine} from "@/stateMachines/godfather/dayTalkMachine";
import {useEffect} from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";

export default () => {
    const godfatherPlayers = useGodfatherGamePlayers();
    // TODO: Game config hook
    const challengeTimeWindow = 3000;
    const talkTime = 5000;
    const challengeTime = 3000;
    const [state, send] = useMachine(dayTalkMachine, {
        guards: {
            goNextAutomatically: () => false,
            expireChallengeAutomatically: () => false,
        },
        delays: {challengeTimeWindow, talkTime, challengeTime},
    });

    const players = state.context.players;
    const talkingPlayer = players.find(p => p.id === state.context.talkingPlayer);
    const remainingTime =
        state.matches("challenge") ?
            ((challengeTime / 1000) - state.context.elapsedTime) :
            ((talkTime / 1000) - state.context.elapsedTime);
    const openStartPopup = state.matches("ready");
    const isDone = state.done!!;
    const challengeAvailable = state.context.challengeAvailable;

    useEffect(() => {
        if (godfatherPlayers.length > 0) 
            send({type: "INITIALIZE", players: godfatherPlayers});
    }, [godfatherPlayers.length]);

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