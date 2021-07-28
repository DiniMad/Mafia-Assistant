import React, {useContext, useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import styled from "styled-components";
import {GameplayContext} from "../../contexts/GameplayContext";
import Player from "./Player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faTheaterMasks, faMoon} from "@fortawesome/free-solid-svg-icons";
import {colors, routes} from "../../utilities";
import useVote from "./hooks/useVote";
import {GameplayPlayer, Talk} from "../../types/Gameplay";
import {useHistory} from "react-router-dom";

const initializeTalkQueue = (playerIds: GameplayPlayer["id"][]) => {
    return playerIds.map<Talk>(playerId => {
        return {playerId, type: "defence"};
    });
};

const VoteRoom = () => {
    const history = useHistory();
    const [{players, talkQueue, displayRoles}, dispatch] = useContext(GameplayContext);
    const {playerShouldDefence, vote, minimumVotesCount} = useVote();
    const [defencesFinished, setDefencesFinished] = useState(false);
    const anyPlayerShouldDefence = playerShouldDefence.length > 0;
    const anyTalksRemain = talkQueue.length > 0;

    useEffect(() => {
        if (!anyTalksRemain && anyPlayerShouldDefence)
            setDefencesFinished(true);
    }, [talkQueue.length]);

    const toggleDisplayRoles = () => dispatch({type: "TOGGLE_DISPLAY_ROLES"});
    const talkButtonClicked = () => {
        if (!anyPlayerShouldDefence || defencesFinished) {
            history.push(routes.nightSleep);
            return;
        }
        dispatch({
            type: "SET_TALK_QUEUE",
            payload: initializeTalkQueue(playerShouldDefence),
        });
    };

    return (
        <PageLayout pageTitle={"رای گیری"}>
            {
                () => {
                    return {
                        content:
                            <Content>
                                {players.map(player =>
                                    <Player key={player.id}
                                            player={player}
                                            displayRole={displayRoles}
                                            minimumVoteRequire={minimumVotesCount}
                                            playerShouldDefence={playerShouldDefence}
                                            vote={vote}/>)}
                            </Content>,
                        menuContent:
                            <>
                                <MenuButton highlight={displayRoles} onClick={toggleDisplayRoles}>
                                    <FontAwesomeIcon icon={faTheaterMasks}/>
                                </MenuButton>
                                <MenuButton highlight={!(anyTalksRemain && anyPlayerShouldDefence)}
                                            onClick={talkButtonClicked}>
                                    {
                                        anyPlayerShouldDefence && !defencesFinished ?
                                            <FontAwesomeIcon icon={faComments}/> :
                                            <FontAwesomeIcon icon={faMoon}/>
                                    }
                                </MenuButton>
                            </>,
                    };
                }
            }
        </PageLayout>
    );
};


const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;

type MenuButtonProps = {
    highlight: boolean
}
const MenuButton = styled.button<MenuButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.highlight ? colors.secondary : "transparent"};
`;
export default VoteRoom;