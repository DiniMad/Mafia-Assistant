import React, {useState} from "react";
import styled from "styled-components";
import {colors, colorWithOpacity} from "../../utilities";
import {GameplayPlayer} from "../../types/Gameplay";
import useTalk from "./hooks/useTalk";
import useLongPress from "../TalkRoom/hooks/useLongPress";
import PlayerOptions from "../TalkRoom/PlayerOptions";
import usePlayerComponentState from "./hooks/usePlayerComponentState";

type Props = {
    player: Pick<GameplayPlayer, "id" | "name" | "role" | "active">,
    displayRole: boolean,
    minimumVoteRequire: number,
    playerShouldDefence: GameplayPlayer["id"][],
    vote: (playerId: GameplayPlayer["id"]) => void
}
const Player = ({player, displayRole, minimumVoteRequire, playerShouldDefence, vote}: Props) => {
    const [displayOptions, setDisplayOptions] = useState(false);
    const {shouldTalk, talkTime, onClick} = useTalk(player);
    const longPressProperties = useLongPress({delay: 300, onClick, onLongPress});
    const shouldDefence = playerShouldDefence.includes(player.id);
    const {componentClasses, sideActionText, sideActionClasses} = usePlayerComponentState({
        active: player.active,
        shouldTalk,
        talkTime,
        shouldDefence,
        minimumVoteRequire,
    });

    const onSideActionClick = () => {
        vote(player.id);
    };

    function onLongPress() {
        setDisplayOptions(true);
    }

    return (
        <PlayerComponent className={componentClasses}>
            <PlayerRole displayRole={displayRole}>{player.role.shortName}</PlayerRole>
            <PlayerName {...longPressProperties}>{player.name}</PlayerName>
            <SideAction disabled={!player.active} className={sideActionClasses} onClick={onSideActionClick}>
                {sideActionText}
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

  &.de-active {
    background-color: ${colorWithOpacity(colors.primary, .6)};
  }

  &.should-talk {
    background-color: ${colors.secondary};
  }
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

const PlayerName = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  font-size: 1.9rem;
  color: ${colors.white};
  user-select: none;
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
  transition: background-color .5s;

  &.should-defence {
    background-color: ${colors.secondary}
  }

  &.de-active {
    background-color: transparent
  }
`;

export default Player;