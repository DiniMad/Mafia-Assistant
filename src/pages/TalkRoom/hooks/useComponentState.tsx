import React, {useContext} from "react";
import {GameplayPlayer,Talk} from "../../../types/Gameplay";
import {GameplayContext} from "../../../contexts/GameplayContext";

const generateComponentClasses = (player: Pick<GameplayPlayer, "id" | "active">, talkQueue: Talk[]) => {
    if (!player.active) return "de-active";
    if (talkQueue.playerIsFirstToTalk(player.id)) return "talking";
    if (talkQueue.playerAlreadyTalked(player.id)) return "talked";
    return "normal";
};
const generateSideActionState = (player: Pick<GameplayPlayer, "id" | "active">, talkQueue: Talk[], talkTime: number) => {
    const playerIsTalking = talkQueue.playerIsFirstToTalk(player.id);
    const text = (!player.active && " ") || (playerIsTalking && talkTime) || "چالش";
    const disabled = !player.active;

    return {text, disabled};
};

type Props = {
    player: Pick<GameplayPlayer, "id" | "active">,
    talkTime: number
}
const useComponentState = ({player, talkTime}: Props) => {
    const [{talkQueue}] = useContext(GameplayContext);
    const componentClasses = generateComponentClasses(player, talkQueue);
    const sideActionStatus = generateSideActionState(player, talkQueue, talkTime);

    return {
        componentClasses,
        sideActionStatus,
    };
};

export default useComponentState;