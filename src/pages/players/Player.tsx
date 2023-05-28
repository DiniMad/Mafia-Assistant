import {useAppDispatch} from "@/store";
import {removePlayer} from "@/store/players";
import {PlayerType} from "@/types/playerType";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import tw from "twin.macro";

type PlayerProps = {
    playerId: PlayerType["id"],
    playerName: string
}

function Player({playerId, playerName}: PlayerProps) {
    const dispatch = useAppDispatch();

    const removeThePlayer = () => dispatch(removePlayer({playerId}));

    return (
        <PlayerComponent>
            <PlayerName>{playerName}</PlayerName>
            <PlayerRemoveButton onClick={removeThePlayer}>
                <PlayerRemoveButtonIcon icon={faXmark}/>
            </PlayerRemoveButton>
        </PlayerComponent>
    );
}

const PlayerComponent = tw.div`bg-background-300 grid grid-cols-[5fr_1fr] justify-center items-center min-h-10 m-1.5`;

const PlayerName = tw.p`col-[1/3] row-[1/1] text-white text-center text-lg`;

const PlayerRemoveButton = tw.button`col-[2/3] row-[1/1] justify-self-center bg-accent-300 flex justify-center items-center h-8 w-8`;
const PlayerRemoveButtonIcon = tw(FontAwesomeIcon)`text-white text-2xl`;

export default Player;