import React, {useContext, useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import styled, {keyframes} from "styled-components";
import {colors, routes} from "../../utilities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUndo, faComments} from "@fortawesome/free-solid-svg-icons";
import useInitializePlayers from "./hooks/useInitializePlayers";
import {GameplayContext} from "../../contexts/GameplayContext";
import Player from "./Player";
import {Link, useHistory} from "react-router-dom";


const RevealRoles = () => {
    const history = useHistory();
    const [{players}, dispatch] = useContext(GameplayContext);
    const [initialPlayers, shuffleRoles] = useInitializePlayers();
    const [reshuffleClasses, setReshuffleClasses] = useState<"animation" | undefined>(undefined);
    const allRolesRevealed = players.findIndex(player => !player.role.revealed) === -1;

    useEffect(() => {
        dispatch({
            type: "SET_PLAYERS",
            payload: initialPlayers,
        });
    }, [initialPlayers]);

    const onReshuffleButtonClicked = () => {
        shuffleRoles();
        setReshuffleClasses("animation");
    };
    const onReshuffleAnimationEnded = () => setReshuffleClasses(undefined);
    const onTalkRoomButtonClicked = () => history.push(routes.talkRoom);

    return (
        <PageLayout pageTitle={"اطلاق نقش"}>
            {() => {
                return {
                    content:
                        <Players>
                            {players.map(player => <Player key={player.id} {...player}/>)}
                        </Players>,
                    menuContent:
                        <>
                            <MenuButton as={Link} to={routes.selectRoles}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </MenuButton>
                            <MenuButton onClick={onReshuffleButtonClicked}>
                                <FontAwesomeIcon icon={faUndo}
                                                 className={reshuffleClasses}
                                                 onAnimationEnd={onReshuffleAnimationEnded}/>
                            </MenuButton>
                            <MenuButton highlight={allRolesRevealed}
                                        disabled={!allRolesRevealed}
                                        onClick={onTalkRoomButtonClicked}>
                                <FontAwesomeIcon icon={faComments}/>
                            </MenuButton>
                        </>,
                };
            }}
        </PageLayout>
    );
};

const Players = styled.div`
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
    highlight?: boolean
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

  svg.animation {
    animation: ${keyframes`
      100% {
        transform: rotate(-360deg);
      }
    `} .3s forwards;;
  }
`;

export default RevealRoles;