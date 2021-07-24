import React, {useContext, useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import styled, {keyframes} from "styled-components";
import {colors} from "../../utilities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUndo, faComments} from "@fortawesome/free-solid-svg-icons";
import useInitializePlayers from "./hooks/useInitializePlayers";
import {GameplayContext} from "../../contexts/GameplayContext";
import Player from "./Player";


const RevealRoles = () => {
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
                        <MenuButton>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </MenuButton>
                        <MenuButton onClick={onReshuffleButtonClicked}>
                            <FontAwesomeIcon icon={faUndo}
                                             className={reshuffleClasses}
                                             onAnimationEnd={onReshuffleAnimationEnded}/>
                        </MenuButton>
                        <MenuButton highlightColor={allRolesRevealed}>
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
    highlightColor?: boolean
}
const MenuButton = styled.button<MenuButtonProps>`
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.highlightColor ? colors.secondary : "transparent"};

  svg.animation {
    animation: ${keyframes`
      100% {
        transform: rotate(-360deg);
      }
    `} .3s forwards;;
  }
`;

export default RevealRoles;