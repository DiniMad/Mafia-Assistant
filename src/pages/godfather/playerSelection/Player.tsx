import tw, {styled} from "twin.macro";
import {Draggable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsUpDown} from "@fortawesome/free-solid-svg-icons";
import {PlayerType} from "@/types/playerType";
import {useAppDispatch} from "@/store/hooks";
import {togglePlayerSelect} from "@/store/players";

type PlayerProps = {
    player: PlayerType
    index: number
}
const Player = ({player, index}: PlayerProps) => {
    const dispatch = useAppDispatch();

    const selectPlayer = () => dispatch(togglePlayerSelect({playerId: player.id}));

    return (
        <Draggable key={player.id} draggableId={player.id} index={index}>
            {(provided, snapshot) => (
                <PlayerComponent ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 selected={player.selected}
                                 dragging={snapshot.isDragging}>
                    <SelectButton onClick={selectPlayer}/>
                    <PlayerName>{player.name}</PlayerName>
                    <DragHandle {...provided.dragHandleProps}>
                        <FontAwesomeIcon icon={faArrowsUpDown}/>
                    </DragHandle>
                </PlayerComponent>
            )}
        </Draggable>
    );
};


const PlayerComponent = styled.div`
  ${tw`grid grid-cols-[6fr 1fr] items-center m-1.5 h-10 transition-colors duration-500`}
  ${({dragging, selected}: { dragging: boolean, selected: boolean }) =>
          selected ?
                  dragging ? tw`bg-accent-400` : tw`bg-accent-300`
                  : tw`bg-background-300 bg-opacity-70`};
`;

const PlayerName = tw.h1`col-[1/3] row-[1] text-lg text-white text-center`;

const SelectButton = tw.div`col-[1/2] row-[1] h-full z-[1]`;

const DragHandle = tw.div`col-[2/3] row-[1] flex justify-center items-center justify-self-center self-center text-white bg-background-300 w-8 h-8`;

export default Player;