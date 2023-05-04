import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import Layout from "@components/Layout";
import Modal from "@components/Modal";
import useDayTalk from "@/pages/godfather/gameFlow/dayTalk/useDayTalk";
import Player from "@/pages/godfather/gameFlow/dayTalk/Player";
import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/dayTalkMachine";

type DayTalkProps = {
    actor: ActorRef<Event, State<Context, Event>>
}
const DayTalk = ({actor}: DayTalkProps) => {
    const {t} = useTranslation();
    const {
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
    } = useDayTalk(actor);

    return (
        <>
            <Layout pageTitle={t("talking")}
                    bottomMenu={<BottomMenu nextTitle={t("next")} isDone={isDone} next={next}/>}>
                <PlayerList>
                    {players.map(p =>
                        <Player key={p.id}
                                playerId={p.id}
                                playerName={p.name}
                                playerHasSpoken={p.hasSpoken}
                                talkingPlayerId={talkingPlayer?.id}
                                talkTimeRemaining={remainingTime}
                                challengeAvailable={challengeAvailable}
                                requestChallengeNow={challengeNow}
                                requestChallengeNext={challengeNext}/>)}
                </PlayerList>
            </Layout>
            <Modal show={openStartPopup}>
                <StartPopup title={t("playerToTalk")}
                            playerName={talkingPlayer?.name}
                            start={start}/>
            </Modal>
        </>
    );
};

const PlayerList = tw.div`flex flex-col justify-start `;

type StartPopupArgs = { title: string, playerName?: string, start: () => void };
const StartPopup = ({title, playerName, start}: StartPopupArgs) =>
    <div tw="bg-background-300 flex flex-col items-center w-5/6 h-1/3 p-4">
        <h2 tw="text-white text-3xl font-bold">{title}</h2>
        <hr tw="w-full my-5 border-background-200 border-t-4"/>
        <div tw="flex flex-col justify-between h-full">
            <p tw="text-white text-center text-2xl">{playerName}</p>
            <button tw="bg-accent-300 text-white py-2 px-5 rounded" onClick={start}>Start</button>
        </div>
    </div>;

type BottomMenuArgs = { nextTitle: string, isDone: boolean, next: () => void };
const BottomMenu = ({nextTitle, isDone, next}: BottomMenuArgs) =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
              to="#">
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl"/>
        </Link>
        <button tw="flex justify-center items-center text-white h-10 w-10" onClick={next}>
            {isDone ?
                <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl"/> :
                nextTitle
            }
        </button>
    </div>;

export default DayTalk;