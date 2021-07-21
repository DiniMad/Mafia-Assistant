import React, {useState} from "react";
import styled from "styled-components";
import Player from "./Player";
import {v4 as uuid} from "uuid";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";

const Players = () => {
    // TODO: Implement the actual players instead of using names
    const selectedGenerator = () => Math.random() > .5;
    const playersInitial = [
        {name: "سید محمد", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی", id: uuid(), selected: selectedGenerator()},
        {name: "سید مجتبی", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
        {name: "دایی", id: uuid(), selected: selectedGenerator()},
        {name: "آقا محسن", id: uuid(), selected: selectedGenerator()},
        {name: "آقا محمد", id: uuid(), selected: selectedGenerator()},
        {name: "سید حسین", id: uuid(), selected: selectedGenerator()},
    ];
    const [players, setPlayers] = useState(playersInitial);

    const onDragEnd = ({draggableId, destination, source}: DropResult) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const item = players.find(player => player.id === draggableId);
        if (!item) return;

        const newPlayers = Array.from(players);
        newPlayers.splice(source.index, 1);
        newPlayers.splice(destination.index, 0, item);
        setPlayers(newPlayers);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={uuid()}>
                {(provided) =>
                    <PlayersComponent {...provided.droppableProps} ref={provided.innerRef}>
                        {players.map((player, index) =>
                            <Player key={player.id} {...player} index={index}/>)}
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
`;

export default Players;