import React, {useContext} from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {PersistentPlayer} from "../../types/PersistentData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";

type Props = Pick<PersistentPlayer, "id" | "name">;
const Player = ({id, name}: Props) => {
    const [, dispatch] = useContext(PersistentPlayersContext);

    const onRemoveButtonClicked = () => {
        dispatch({
            type: "REMOVE_PLAYER",
            payload: id,
        });
    };

    return (
        <PlayerComponent>
            <PlayerName>{name}</PlayerName>
            <SelectButton onClick={onRemoveButtonClicked}>
                <FontAwesomeIcon icon={faTimes}/>
            </SelectButton>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .6rem;
  height: 4rem;
  background-color: ${colors.primary};
`;

const PlayerName = styled.h1`
  grid-column: 1/3;
  grid-row: 1;
  justify-self: center;
  font-size: 1.9rem;
  color: ${colors.white};
`;

const SelectButton = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: 1.9rem;
  color: ${colors.white};
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.secondary};
  z-index: 1;
`;

export default Player;