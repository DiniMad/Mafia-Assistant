import React from "react";
import styled from "styled-components";
import Player from "./Player";

const Players = () => {
    // TODO: Implement the actual players instead of using names
    const names = [
        "سید محمد",
        "سید علی",
        "سید مجتبی",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "سید علی میری",
        "دایی",
        "آقا محسن",
        "آقا محمد",
        "سید حسین",
    ];
    return (
        <PlayersComponent>
            {names.map((name, index) =>
                <Player key={index} selected={Math.random() > 0.5} name={name}/>)}
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