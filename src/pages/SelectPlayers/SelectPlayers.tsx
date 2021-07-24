import React, {useContext} from "react";
import styled from "styled-components";
import {colors, routes} from "../../utilities";
import Players from "./Players";
import PageLayout from "../../components/PageLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUserSecret,
    faUserMd,
    faUserGraduate,
    faUser,
    faArrowLeft,
    faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";
import {Link, useHistory} from "react-router-dom";

const SelectPlayers = () => {
    const history = useHistory();
    const [players] = useContext(PersistentPlayersContext);
    const MINIMUM_PLAYERS_COUNT = 6 as const;
    const playersCountAllowed = players.filter(player => player.selected).length >= MINIMUM_PLAYERS_COUNT;

    const onSelectRolesPageButtonClicked = () => history.push(routes.selectRoles);

    return (
        <PageLayout pageTitle={"انتخاب بازیکنان"}>
            {
                () => {
                    return {
                        content: <Players/>,
                        menuContent: <>
                            <MenuButton as={Link} to={routes.start}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </MenuButton>
                            <MenuButton as={Link} to={routes.modifyPlayers}>
                                <FontAwesomeIcon icon={faUserEdit}/>
                            </MenuButton>
                            <MenuButton highlight={playersCountAllowed}
                                        disabled={!playersCountAllowed}
                                        onClick={onSelectRolesPageButtonClicked}>
                                <FontAwesomeIcon className={"roles-button"} icon={faUserSecret}/>
                                <FontAwesomeIcon className={"roles-button"} icon={faUserMd}/>
                                <FontAwesomeIcon className={"roles-button"} icon={faUserGraduate}/>
                                <FontAwesomeIcon className={"roles-button"} icon={faUser}/>
                            </MenuButton>
                        </>,
                    };
                }
            }
        </PageLayout>
    );
};

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
  padding: .5rem 1.2rem;
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.highlight ? colors.secondary : "transparent"};
  transition: background-color .5s;

  .roles-button {
    position: absolute;
    font-size: 1.5rem;

    &:nth-of-type(1) {
      transform: translate(-.8rem, -.8rem);
    }

    &:nth-of-type(2) {
      transform: translate(.8rem, -.8rem);
    }

    &:nth-of-type(3) {
      transform: translate(-.8rem, .8rem);
    }

    &:nth-of-type(4) {
      transform: translate(.8rem, .8rem);
    }
  }
`;

export default SelectPlayers;