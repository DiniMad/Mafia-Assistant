import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/eliminationMachine";
import useElimination from "@/pages/godfather/gameFlow/elimination/useElimination";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Layout from "@components/Layout";
import tw from "twin.macro";
import Player from "@/pages/godfather/gameFlow/elimination/Player";
import Modal from "@components/Modal";
import EliminationCards from "@/pages/godfather/gameFlow/elimination/EliminationCards";
import Announcement from "@/pages/godfather/gameFlow/elimination/Announcement";

type EliminationProps = {
    actor: ActorRef<Event, State<Context, Event>>
}
const Elimination = ({actor}: EliminationProps) => {
    const {t} = useTranslation();
    const {
        cards,
        players,
        announcement,
        selectCardPopup,
        announcementPopup,
        selectCard,
        done,
        selectPlayer,
        next,
    } = useElimination(actor);

    return (
        <>
            <Layout pageTitle={t("elimination")} bottomMenu={<BottomMenu next={next}/>}>
                <PlayerList>
                    {players.map(p =>
                        <Player key={p.id}
                                playerId={p.id}
                                playerName={p.name}
                                selected={p.selected!!}
                                select={selectPlayer}/>)}
                </PlayerList>
            </Layout>
            <Modal show={selectCardPopup}>
                <EliminationCards cards={cards} select={selectCard}/>
            </Modal>
            <Modal show={announcementPopup}>
                <Announcement announcement={announcement} done={done}/>
            </Modal>
        </>
    );
};

const PlayerList = tw.div`flex flex-col justify-start h-full overflow-y-auto scrollbar-hide`;

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

export default Elimination;