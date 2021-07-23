import React, {useContext} from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {Draggable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons";
import {PersistentPlayer} from "../../types/PersistentData";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";

type Props = {
    index: number,
    player: PersistentPlayer
}
const Player = ({index, player}: Props) => {
    const [, dispatch] = useContext(PersistentPlayersContext);

    const selectPlayer = () => {
        dispatch({
            type: "SELECT_PLAYER",
            payload: player.id
        });
    };
    
    return (
        <Draggable draggableId={player.id} index={index} isDragDisabled={!player.selected}>
            {(provided, snapshot) =>
                <PlayerComponent {...provided.draggableProps}
                                 ref={provided.innerRef}
                                 selected={player.selected}
                                 dragging={snapshot.isDragging}>
                    <PlayerName>{player.name}</PlayerName>
                    <SelectButton onClick={selectPlayer}/>
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
  margin: .6rem;
  height: 4rem;
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
  font-size: 1.9rem;
  color: ${colors.white};
`;

const SelectButton = styled.button`
  grid-column: 1/2;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  background-color: transparent;
  z-index: 1;
`;

const DragHandle = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.primary};

  svg {
    font-size: 1.9rem;
    color: ${colors.white};
  }
`;

export default Player;