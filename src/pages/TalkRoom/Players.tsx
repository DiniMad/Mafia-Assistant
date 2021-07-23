import React, {useContext} from "react";
import styled from "styled-components";
import {GameplayContext} from "../../contexts/GameplayContext";
import Player from "./Player";

const Players = () => {
    const [{players, displayRoles}] = useContext(GameplayContext);
    
    return (
        <PlayersComponent>
            {players.map(player =>
                <Player key={player.id}
                        player={player}
                        displayRole={displayRoles}
                        timeToTalk={player.talking ? "30" : undefined}/>)}
        </PlayersComponent>
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