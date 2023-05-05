import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/votingMachine";
import {useActor} from "@xstate/react";
import {GodfatherPlayer} from "@/types/godfatherGame";

export default (actor: ActorRef<Event, State<Context, Event>>) => {
    const [state, send] = useActor(actor);

    const players = state.context.players;

    const toggleHasTheVote = (playerId: GodfatherPlayer["id"]) => send({type: "TOGGLE_VOTE", playerId});
    const next = () => send({type: "NEXT"});

    return {players, toggleHasTheVote, next};
}