import React, {useState} from "react";
import styled from "styled-components";
import {colors, colorWithOpacity} from "../../utilities";
import {GameplayPlayer} from "../../types/Gameplay";
import PlayerOptions from "./PlayerOptions";
import useComponentState from "./hooks/useComponentState";
import useLongPress from "./hooks/useLongPress";
import useTalk from "./hooks/useTalk";

type Props = {
    player: GameplayPlayer,
    displayRole: boolean,
}
const Player = ({player, displayRole}: Props) => {
    const [displayOptions, setDisplayOptions] = useState(false);
    const {onClick, onSideActionClicked, talkTime} = useTalk(player);
    const longPressProperties = useLongPress({delay: 300, onClick, onLongPress});
    const {componentClasses, sideActionStatus} = useComponentState({player, talkTime});

    function onLongPress() {
        setDisplayOptions(true);
    }

    return (
        <PlayerComponent className={componentClasses}>
            <PlayerRole displayRole={displayRole}>{player.role.shortName}</PlayerRole>
            <PlayerName disabled={!player.active} {...longPressProperties}>{player.name}</PlayerName>
            <SideAction disabled={sideActionStatus.disabled} onClick={onSideActionClicked}>
                {sideActionStatus.text}
            </SideAction>
            <PlayerOptions display={displayOptions} setDisplay={setDisplayOptions} player={player}/>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .6rem;
  height: 4rem;
  background-color: ${colors.primary};
  transition: background-color .5s;

  &.long-press {
    background-color: ${colorWithOpacity(colors.primaryDark, .8)};
  }

  &.de-active, &.talked {
    background-color: ${colorWithOpacity(colors.primary, .6)};

    &.de-active {
      border: ${colors.primaryLight} solid .2rem;
    }
  }

  &.talking {
    background-color: ${colors.secondary};
  }
`;

const SideAction = styled.button`
  grid-column: 3/4;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: 1.4rem;
  color: ${colors.white};
  height: 3.5rem;
  width: 3.5rem;
  background-color: ${colors.primaryLight};

  ${PlayerComponent}.de-active &, ${PlayerComponent}.talking & {
    background-color: transparent;
  }
`;

const PlayerName = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  font-size: 1.9rem;
  color: ${colors.white};
  user-select: none;
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
  font-size: 1.4rem;
  color: ${colors.white};
  opacity: ${props => props.displayRole ? 1 : 0};
  transition: opacity .3s;
`;

export default Player;