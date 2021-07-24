import React, {useContext} from "react";
import styled from "styled-components";
import Player from "./Player";
import {v4 as uuid} from "uuid";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";

const Players = () => {
    const [players, dispatch] = useContext(PersistentPlayersContext);

    const onDragEnd = ({draggableId, destination, source}: DropResult) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const item = players.find(player => player.id === draggableId);
        if (!item) return;

        const newPlayers = Array.from(players);
        newPlayers.splice(source.index, 1);
        newPlayers.splice(destination.index, 0, item);
        dispatch({
            type: "REORDER_PLAYER",
            payload: newPlayers
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={uuid()}>
                {(provided) =>
                    <PlayersComponent {...provided.droppableProps} ref={provided.innerRef}>
                        {players.map((player, index) =>
                            <Player key={player.id} index={index} player={player}/>)}
                        {provided.placeholder}
                    </PlayersComponent>
                }
            </Droppable>
        </DragDropContext>
    );
};

export const PlayersComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;

export default Players;