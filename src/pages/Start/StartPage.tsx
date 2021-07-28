import React from "react";
import styled from "styled-components";
import {colors, routes} from "../../utilities";
import {Link} from "react-router-dom";

const StartPage = () => {
    return (
        <StartPageComponent>
            <StartGameButton background={colors.secondary} to={routes.selectPlayers}>
                {"شروع بازی"}
            </StartGameButton>
            <StartGameButton background={colors.primary} to={routes.modifyPlayers}>
                {"ویرایش بازیکنان"}
            </StartGameButton>
            <StartGameButton background={colors.primary} to={routes.config}>
                {"تنظیمات بازی"}
            </StartGameButton>
        </StartPageComponent>
    );
};

const StartPageComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

type StartGameButtonProps = {
    background: string,
}
const StartGameButton = styled(Link)<StartGameButtonProps>`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${colors.white};
  border-radius: 1.6rem;
  padding: 1rem 2.4rem;
  margin: 1.6rem;
  background-color: ${props => props.background};
`;

export default StartPage;