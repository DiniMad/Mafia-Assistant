import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";

type Props = {
    selected: boolean,
    name: string
}
const Player = ({selected, name}: Props) => {
    return (
        <PlayerComponent selected={selected}>
            <PlayerName>{name}</PlayerName>
        </PlayerComponent>
    );
};

type PlayerItemProps = {
    selected: boolean
}
const PlayerComponent = styled.button<PlayerItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .5rem;
  padding: .5rem;
  background-color: ${props => props.selected ? colors.secondary : colors.primary};
  opacity: ${props => props.selected ? 1 : .6};
`;

const PlayerName = styled.p`
  font-size: 1.2rem;
  color: ${colors.white};
`;

export default Player;