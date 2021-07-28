import React, {useContext, useEffect} from "react";
import {useTimer} from "react-timer-hook";
import {GameplayContext} from "../../../contexts/GameplayContext";
import {Config, GameplayPlayer, Talk} from "../../../types/Gameplay";
import toast from "react-hot-toast";
import {colors} from "../../../utilities";

const calculateTalkTime = (config: Config, talk?: Talk) => {
    if (!talk) return 0;

    const duration =
        (talk.type === "discus" && config.talkTime) ||
        (talk.type === "challenge" && config.challengeTime) ||
        (config.defenseTime);

    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time.getTime();
};
const totalSeconds = (minutes: number, seconds: number) => minutes * 60 + seconds;

type Props = GameplayPlayer
const useTalk = (player: Props) => {
    const [{players, talkQueue, playerChallengesBeenUsed, config}, dispatch] = useContext(GameplayContext);
    const {restart, pause, resume, isRunning, minutes, seconds} = useTimer({
        autoStart: false,
        expiryTimestamp: calculateTalkTime(config, talkQueue.peak()),
        onExpire: onTimeFinished,
    });

    useEffect(() => {
        if (!talkQueue.playerIsFirstToTalk(player.id)) return;

        if (!player.active) {
            dispatch({type: "TALK_FINISHED"});
            return;
        }

        restart(calculateTalkTime(config, talkQueue.peak()));
    }, [talkQueue.length, player.active]);

    function onTimeFinished() {
        if (!talkQueue.playerIsFirstToTalk(player.id)) return;
        dispatch({type: "TALK_FINISHED"});

        if (!talkQueue.playerIsFirstToTalk(player.id)) return;
        restart(calculateTalkTime(config, talkQueue.peak()));
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
    const onSideActionClicked = () => {
        const playerIsTalking = talkQueue.playerIsFirstToTalk(player.id);
        if (!player.active || playerIsTalking) return;

        const firstTalk = talkQueue.peak();
        if (!firstTalk || firstTalk.type !== "discus") return;
        const talkingPlayer = players.find(player => player.id === firstTalk.playerId);
        if (!talkingPlayer) return;
        const playerChallengeBeenUsed = playerChallengesBeenUsed.includes(talkingPlayer.id);
        if (playerChallengeBeenUsed) return;

        dispatch({
            type: "TALK_BEFORE",
            payload: {
                playerId: talkingPlayer.id,
                talk: {
                    playerId: player.id,
                    type: "challenge",
                },
            },
        });
        dispatch({
            type: "CHALLENGE_BEEN_USED",
            payload: talkingPlayer.id,
        });
    };
    const onSideActionLongPress = () => {
        const playerIsTalking = talkQueue.playerIsFirstToTalk(player.id);
        if (!player.active || playerIsTalking) return;

        const firstTalk = talkQueue.peak();
        if (!firstTalk || firstTalk.type !== "discus") return;
        const talkingPlayer = players.find(player => player.id === firstTalk.playerId);
        if (!talkingPlayer) return;
        const playerChallengeBeenUsed = playerChallengesBeenUsed.includes(talkingPlayer.id);
        if (playerChallengeBeenUsed) return;

        dispatch({
            type: "TALK_AFTER",
            payload: {
                playerId: talkingPlayer.id,
                talk: {
                    playerId: player.id,
                    type: "challenge",
                },
            },
        });
        dispatch({
            type: "CHALLENGE_BEEN_USED",
            payload: talkingPlayer.id,
        });

        toast.success("چالش بعد از صحبت بازیکن", {
            duration: 3000,
            style: {
                fontSize: "1.9rem",
                color: colors.white,
                backgroundColor: colors.primaryLight,
                border: `${colors.secondaryDark} solid .2rem`,
            },
            icon: null,
            position: "top-center",
        });
    };

    return {
        talkTime: totalSeconds(minutes, seconds),
        onClick,
        onSideActionClicked,
        onSideActionLongPress,
    };
};

export default useTalk;