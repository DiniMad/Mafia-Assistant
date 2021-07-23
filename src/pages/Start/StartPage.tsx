import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";

const StartPage = () => {
    return (
        <StartPageComponent>
            <StartGameButton background={colors.secondary}>{"شروع بازی"}</StartGameButton>
            <StartGameButton background={colors.primary}>{"ویرایش بازیکنان"}</StartGameButton>
            <StartGameButton background={colors.primary}>{"تنظیمات بازی"}</StartGameButton>
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
const StartGameButton = styled.button<StartGameButtonProps>`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${colors.white};
  border-radius: 1.6rem;
  padding: 1rem 2.4rem;
  margin: 1.6rem;
  background-color: ${props => props.background};
`;

export default StartPage;