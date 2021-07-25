import React, {useContext, useState} from "react";
import styled from "styled-components";
import {colors,colorWithOpacity} from "../../utilities";
import {GameplayPlayer} from "../../types/Gameplay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTheaterMasks} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import {GameplayContext} from "../../contexts/GameplayContext";
import {vh, vw} from "../../utilities";

type Props = Pick<GameplayPlayer, "id" | "name" | "role">;
const Player = ({id, name, role: {name: roleName, revealed}}: Props) => {
    const [, dispatch] = useContext(GameplayContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const onRevealButtonClicked = () => {
        setModalOpen(true);
        dispatch({
            type: "REVEAL_ROLE",
            payload: id,
        });
    };
    const onModalCloseButtonClicked = () => setModalOpen(false);

    return (
        <PlayerComponent revealed={revealed}>
            <PlayerName>{name}</PlayerName>
            <RevealRoleButton revealed={revealed} disabled={revealed} onClick={onRevealButtonClicked}>
                <FontAwesomeIcon icon={faTheaterMasks}/>
            </RevealRoleButton>
            <Modal isOpen={isModalOpen} closeTimeoutMS={300} ariaHideApp={false}>
                <ModalContent>
                    <PlayerName>{name}</PlayerName>
                    <PlayerRole>{roleName}</PlayerRole>
                    <ModalCloseButton onClick={onModalCloseButtonClicked}>متوجه شدم</ModalCloseButton>
                </ModalContent>
            </Modal>
        </PlayerComponent>
    );
};
type PlayerItemProps = Pick<Props["role"], "revealed">;
const PlayerComponent = styled.div<PlayerItemProps>`
  display: grid;
  grid-template-columns: 6fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .6rem;
  height: 4rem;
  background-color: ${props =>
          props.revealed ?
                  colorWithOpacity(colors.primary, .6) :
                  colors.primary};
`;

const PlayerName = styled.div`
  grid-column: 1/3;
  grid-row: 1;
  justify-self: center;
  font-size: 1.9rem;
  color: ${colors.white};
`;

type RevealRoleButtonProps = Pick<Props["role"], "revealed">;
const RevealRoleButton = styled.button<RevealRoleButtonProps>`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: ${colors.white};
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${props => props.revealed ? colors.primaryLight : colors.secondary};
  transition: background-color .5s;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${vh(30)};
  width:  ${vw(50)};

  ${PlayerName} {
    font-size: 2.4rem;
    text-align: center;
    border-bottom: ${colors.primaryDark} solid .2rem;
    padding-bottom: .5rem;
    width: 100%;
  }
`;

const PlayerRole = styled.p`
  font-size: 2rem;
  color: ${colors.secondary};
`;


const ModalCloseButton = styled.button`
  font-size: 2rem;
  color: ${colors.white};
  border-radius: 1rem;
  padding: .8rem 2rem;
  background-color: ${colors.primaryLight};
`;

export default Player;