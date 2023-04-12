import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import Player from "@/pages/godfather/playerSelection/Player";
import tw from "twin.macro";
import {useAppDispatch} from "@/store";
import {reorderPlayer, usePlayers} from "@/store/players";

const PlayerList = () => {
    const players = usePlayers();
    const dispatch = useAppDispatch();

    const reorderPlayers = ({draggableId, destination, source}: DropResult) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) return;

        dispatch(reorderPlayer({
            playerId: draggableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        }));
    };

    return (
        <DragDropContext onDragEnd={reorderPlayers}>
            <Droppable droppableId="players-list">
                {(provided, snapshot) => (
                    <PlayersComponent {...provided.droppableProps} ref={provided.innerRef}>
                        {players.map((item, index) => (
                            <Player key={item.id} player={item} index={index}/>
                        ))}
                        {provided.placeholder}
                    </PlayersComponent>
                )}
            </Droppable>
        </DragDropContext>
    );
};


const PlayersComponent = tw.div`flex flex-col justify-start h-full`;

export default PlayerList;