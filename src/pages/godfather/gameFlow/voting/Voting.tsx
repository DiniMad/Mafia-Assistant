import tw from "twin.macro";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Layout from "@components/Layout";
import {useTranslation} from "react-i18next";
import Player from "@/pages/godfather/gameFlow/voting/Player";
import {ActorRef, State} from "xstate";
import {Context, Event} from "@/stateMachines/godfather/votingMachine";
import useVoting from "@/pages/godfather/gameFlow/voting/useVoting";

// TODO: Getting from configuration hook
const minimumRequiredPercentage = 50 / 100;
type VotingProps = {
    actor: ActorRef<Event, State<Context, Event>>
}
const Voting = ({actor}: VotingProps) => {
    const {t} = useTranslation();
    const {players, toggleHasTheVote, next} = useVoting(actor);
    const minimumRequiredCount = Math.ceil(minimumRequiredPercentage * players.length);

    return (
        <Layout pageTitle={t("voting")} bottomMenu={<BottomMenu next={next}/>}>
            <PlayerList>
                {players.map(p =>
                    <Player key={p.id}
                            playerId={p.id}
                            playerName={p.name}
                            hasTheVote={p.hasTheVote}
                            minimumRequiredCount={minimumRequiredCount}
                            toggleHasTheVote={toggleHasTheVote}/>)}
            </PlayerList>
        </Layout>
    );
};

const PlayerList = tw.div`flex flex-col justify-start `;

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

export default Voting;