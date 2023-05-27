import React from "react";
import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/nightActionMachine";
import Layout from "@components/Layout";
import tw from "twin.macro";
import {useTranslation} from "react-i18next";
import useNightAction from "@/pages/godfather/gameFlow/nightAction/useNightAction";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Modal from "@components/Modal";
import NightActionAnnouncement from "@/pages/godfather/gameFlow/nightAction/NightActionAnnouncement";
import ActingPlayer from "@/pages/godfather/gameFlow/nightAction/ActingPlayer";
import ActedOnPlayer from "@/pages/godfather/gameFlow/nightAction/ActedOnPlayer";

type NightActionProps = {
    actor: ActorRef<Event, State<Context, Event>>
}
const NightAction = ({actor}: NightActionProps) => {
    const {t} = useTranslation();
    const {
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
    } = useNightAction(actor);

    return (
        <>
            <Layout pageTitle={t("nightAction")} bottomMenu={<BottomMenu next={next}/>}>
                <PlayerList>
                    {isInQueue ?
                        actingPlayers.map(p =>
                            <ActingPlayer key={p.id}
                                          playerId={p.id}
                                          playerName={p.name}
                                          active={p.canAct}
                                          select={selectPlayer}/>) :
                        actedOnPlayers.map(p =>
                            <ActedOnPlayer key={p.id}
                                           playerId={p.id}
                                           playerName={p.name}
                                           playerRole={p.roleKey}
                                           mafiaAct={mafiaAct}
                                           active={p.active}
                                           selected={p.selected}
                                           revealRole={p.revealRole}
                                           revealMafiaAct={revealMafiaAct}
                                           select={selectPlayer}/>)}
                </PlayerList>
            </Layout>
            <Modal show={popup}>
                <NightActionAnnouncement announcement={announcement!}
                                         next={next}
                                         chooseAnswer={chooseFromMultiAnswer}/>
            </Modal>
        </>
    );
};


const PlayerList = tw.div`flex flex-col justify-start`;

const BottomMenu = ({next}: { next: () => void }) =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
              to="#">
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl"/>
        </Link>
        <button tw="flex justify-center items-center h-10 w-10" onClick={next}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl"/>
        </button>
    </div>;

export default NightAction;