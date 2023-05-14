import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/eliminationMachine";
import {useActor} from "@xstate/react";
import {GodfatherPlayer} from "@/types/godfatherGame";

export default (actor: ActorRef<Event, State<Context, Event>>) => {
    const [state, send] = useActor(actor);

    const cards = state.context.cardKeys;
    const players = state.context.players;
    const announcement = state.context.announcement;
    const selectCardPopup = state.matches("elimination");
    const announcementPopup = state.context.announcement !== undefined;

    const selectCard = (index: number) => send({type: "SELECT_CARD", index});
    const done = () => send({type: "DONE"});
    const selectPlayer = (playerId: GodfatherPlayer["id"]) =>
        send({type: "SELECT_PLAYER", playerId});
    const next = () => send({type: "NEXT"});

    return {
        cards,
        players,
        announcement,
        selectCardPopup,
        announcementPopup,
        selectCard,
        done,
        selectPlayer,
        next,
    };
}