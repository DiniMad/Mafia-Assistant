import React from "react";
import styled from "styled-components";
import Player from "./Player";
import {v4 as uuid} from "uuid";

const Players = () => {
    // TODO: Implement the actual players instead of using names
    const names = [
        {name: "سید محمد", id: uuid()},
        {name: "سید علی", id: uuid()},
        {name: "سید مجتبی", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "سید علی میری", id: uuid()},
        {name: "دایی", id: uuid()},
        {name: "آقا محسن", id: uuid()},
        {name: "آقا محمد", id: uuid()},
        {name: "سید حسین", id: uuid()},
    ];
    return (
        <PlayersComponent>
            {names.map((player, index) =>
                <Player key={index} selected={Math.random() > 0.5} name={player.name}/>)}
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