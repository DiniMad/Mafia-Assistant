import React, {useContext, useEffect} from "react";
import {useTimer} from "react-timer-hook";
import {GameplayContext} from "../../../contexts/GameplayContext";
import {Config, GameplayPlayer} from "../../../types/Gameplay";

const calculateTalkTime = (config: Config) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + config.defenseTime);
    return time.getTime();
};
const totalSeconds = (minutes: number, seconds: number) => minutes * 60 + seconds;

type Props = Pick<GameplayPlayer, "id" | "active">
const useTalk = (player: Props) => {
    const [{talkQueue, config}, dispatch] = useContext(GameplayContext);
    const {restart, pause, resume, isRunning, minutes, seconds} = useTimer({
        autoStart: false,
        expiryTimestamp: calculateTalkTime(config),
        onExpire: onTimeFinished,
    });

    useEffect(() => {
        if (!talkQueue.playerIsFirstToTalk(player.id)) return;

        if (!player.active) {
            dispatch({type: "TALK_FINISHED"});
            return;
        }

        restart(calculateTalkTime(config));
    }, [talkQueue.length, player.active]);

    function onTimeFinished() {
        if (!talkQueue.playerIsFirstToTalk(player.id)) return;
        dispatch({type: "TALK_FINISHED"});
    }

    const onClick = () => {
        if (!player.active || talkQueue.playerAlreadyTalked(player.id)) return;

        const playerIsTalking = talkQueue.playerIsFirstToTalk(player.id);
        if (playerIsTalking)
            isRunning ? pause() : resume();
        else {
            const nextToTalk = talkQueue.peak(1);
            if (!nextToTalk) return;

            const playerIsNextToTalk = nextToTalk.playerId === player.id;
            if (!playerIsNextToTalk) return;

            dispatch({type: "TALK_FINISHED"});
        }
    };

    return {
        shouldTalk: talkQueue.playerIsFirstToTalk(player.id),
        talkTime: totalSeconds(minutes, seconds),
        onClick,
    };
};

export default useTalk;