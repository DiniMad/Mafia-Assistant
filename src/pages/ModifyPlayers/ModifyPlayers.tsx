import React, {useContext} from "react";
import PageLayout from "../../components/PageLayout";
import styled from "styled-components";
import {colors} from "../../utilities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";
import Player from "./Player";
import NewPlayer from "./NewPlayer";

const ModifyPlayers = () => {
    const [players] = useContext(PersistentPlayersContext);

    return (
        <PageLayout pageTitle={"ویرایش بازیکنان"}>
            {() => {
                return {
                    content:
                        <Content>
                            <Players>
                                {players.map(player => <Player key={player.id} {...player}/>)}
                            </Players>
                            <NewPlayer/>
                        </Content>,
                    menuContent:
                        <MenuButton>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </MenuButton>,
                };
            }}
        </PageLayout>
    );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Players = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  padding: .5rem 1.2rem;
  width: 4rem;
  height: 4rem;
`;
export default ModifyPlayers;