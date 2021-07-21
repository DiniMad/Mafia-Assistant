import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {Draggable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons";

// TODO: Should get an intersection of Player type and its props.
type Props = {
    selected: boolean,
    name: string,
    id: string,
    index: number,
}
const Player = ({selected, name, id, index}: Props) => {
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={!selected}>
            {(provided, snapshot) =>
                <PlayerComponent {...provided.draggableProps}
                                 ref={provided.innerRef}
                                 selected={selected}
                                 dragging={snapshot.isDragging}>
                    <PlayerName>{name}</PlayerName>
                    <SelectButton/>
                    <DragHandle {...provided.dragHandleProps}>
                        <FontAwesomeIcon icon={faArrowsAltV}/>
                    </DragHandle>
                </PlayerComponent>
            }
        </Draggable>
    );
};

type PlayerItemProps = {
    selected: boolean,
    dragging: boolean,
}
const PlayerComponent = styled.div<PlayerItemProps>`
  display: grid;
  grid-template-columns: 6fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .5rem;
  background-color: ${
          props => props.selected ?
                  props.dragging ? colors.secondaryDark : colors.secondary
                  : colors.primary};
  opacity: ${props => props.selected ? 1 : .6};
`;

const PlayerName = styled.h1`
  grid-column: 1/3;
  grid-row: 1;
  justify-self: center;
  font-size: 1.2rem;
  color: ${colors.white};
`;

const SelectButton = styled.button`
  grid-column: 1/2;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  background-color: transparent;
`;

const DragHandle = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .2rem;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.primary};

  svg {
    font-size: 1.2rem;
    color: ${colors.white};
  }
`;

export default Player;