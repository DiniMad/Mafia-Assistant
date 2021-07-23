import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {GameplayPlayer} from "../../types/Gameplay";
import {colorWithOpacity} from "../../utilities/colors";

type Props = {
    player: GameplayPlayer,
    timeToTalk?: string,
    displayRole: boolean,
}
const Player = ({player, timeToTalk, displayRole}: Props) => {
    return (
        <PlayerComponent talking={player.talking} talked={player.talked}>
            <PlayerRole displayRole={displayRole}>{player.role.shortName}</PlayerRole>
            <PlayerName>{player.name}</PlayerName>
            <PlayerSideAction talking={player.talking}>
                {player.talking ? timeToTalk : "چالش"}
            </PlayerSideAction>
        </PlayerComponent>
    );
};
type PlayerItemProps = Pick<GameplayPlayer, "talked" | "talking">;
const PlayerComponent = styled.div<PlayerItemProps>`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .4rem;
  background-color: ${props =>
          props.talking ?
                  colors.secondary :
                  props.talked ? colorWithOpacity(colors.primary, .6) : colors.primary};
`;

type PlayerSideActionProps = Pick<GameplayPlayer, "talking">;
const PlayerSideAction = styled.button<PlayerSideActionProps>`
  grid-column: 3/4;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: .9rem;
  color: ${colors.white};
  margin: .2rem;
  height: 2rem;
  width: 2rem;
  background-color: ${props => props.talking ? colors.secondaryDark : colors.primaryLight};
`;

const PlayerName = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  font-size: 1.2rem;
  color: ${colors.white};
`;

type PlayerRoleProps = Pick<Props, "displayRole">;
const PlayerRole = styled.h3<PlayerRoleProps>`
  grid-column: 1/2;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .9rem;
  color: ${colors.white};
  opacity: ${props => props.displayRole ? 1 : 0};
  transition: opacity .3s;
`;
export default Player;