import React, {useContext} from "react";
import styled from "styled-components";
import Modal from "react-modal";
import {colors, vh, vw} from "../../utilities";
import {GameplayPlayer} from "../../types/Gameplay";
import {GameplayContext} from "../../contexts/GameplayContext";

type Props = {
    player: GameplayPlayer,
    display: boolean,
    setDisplay: (value: boolean) => void,
}
const PlayerOptions = ({player, display, setDisplay}: Props) => {
    const [, dispatch] = useContext(GameplayContext);

    const closeModal = () => setDisplay(false);
    const toggleDisable = () => {
        dispatch({
            type: "TOGGLE_ACTIVE",
            payload: player.id,
        });
        closeModal();
    };

    return (
        <Modal isOpen={display}
               shouldCloseOnOverlayClick={true}
               onRequestClose={closeModal}
               closeTimeoutMS={300}
               ariaHideApp={false}>
            <ModalContent>
                <PlayerName>{player.name}</PlayerName>
                <Button onClick={toggleDisable}>{player.active ? "غیر فعال" : "فعال"}</Button>
                <Button onClick={closeModal} transparent>بستن</Button>
            </ModalContent>
        </Modal>
    );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${vh(30)};
  width: ${vw(50)};
  user-select: none;
`;

const PlayerName = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: ${colors.white};
  border-bottom: ${colors.primaryDark} solid .3rem;
  padding-bottom: 1rem;
  width: 100%;
`;

type ButtonProps = {
    transparent?: boolean
}
const Button = styled.button<ButtonProps>`
  font-size: 1.9rem;
  color: ${colors.white};
  padding: .8rem 2rem;
  width: 100%;
  background-color: ${props => props.transparent ? "transparent" : colors.primaryLight};
`;

export default PlayerOptions;