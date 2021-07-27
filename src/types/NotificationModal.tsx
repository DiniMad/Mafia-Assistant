import React from "react";
import styled from "styled-components";
import {colors, vh, vw} from "../utilities";
import Modal from "react-modal";

type Props = {
    playerName?: string,
    display: boolean,
    start: () => void,
}
const NotificationModal = ({playerName, display, start}: Props) => {
    return (
        <Modal isOpen={display && Boolean(playerName)} closeTimeoutMS={300} ariaHideApp={false}>
            <ModalContent>
                <Title>شروع کننده بازی</Title>
                <PlayerName>{playerName}</PlayerName>
                <Button onClick={start}>شروع</Button>
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${colors.white};
  border-bottom: ${colors.primaryDark} solid .3rem;
  padding-bottom: 1rem;
  width: 100%;
`;

const PlayerName = styled.h2`
  font-size: 1.9rem;
  text-align: center;
  color: ${colors.secondary};
  width: 100%;
`;

const Button = styled.button`
  font-size: 1.9rem;
  color: ${colors.white};
  padding: .8rem 2rem;
  width: 100%;
  background-color: ${colors.primaryLight};
`;

export default NotificationModal;