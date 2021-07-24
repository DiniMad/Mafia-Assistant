import React, {useContext} from "react";
import PageLayout from "../../components/PageLayout";
import Role from "./Role";
import styled from "styled-components";
import {colors, routes} from "../../utilities";
import {PersistentRolesContext} from "../../contexts/PersistentRolesContext";
import useRoleState from "./hooks/useRoleState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faTheaterMasks} from "@fortawesome/free-solid-svg-icons";
import Status from "./Status";
import {Link, useHistory} from "react-router-dom";


const SelectRoles = () => {
    const [roles] = useContext(PersistentRolesContext);
    const {statuses, isSelectionValid, error} = useRoleState();
    const history = useHistory();

    const onRevealRolesButtonClicked = () => history.push(routes.revealRoles);

    return (
        <PageLayout pageTitle={"انتخاب نقش ها"}>
            {() => {
                return {
                    content:
                        <Content>
                            <Status {...statuses}/>
                            <Roles>{roles.map(role => <Role key={role.name} {...role}/>)}</Roles>
                        </Content>,
                    menuContent:
                        <>
                            <MenuButton as={Link} to={routes.selectPlayers}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </MenuButton>
                            <TextSpan disappear={isSelectionValid}>{error}</TextSpan>
                            <MenuButton highlight={isSelectionValid}
                                        disabled={!isSelectionValid}
                                        onClick={onRevealRolesButtonClicked}>
                                <FontAwesomeIcon icon={faTheaterMasks}/>
                            </MenuButton>
                        </>,
                };
            }}
        </PageLayout>
    );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;

const Roles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: scroll;
  overflow-x: hidden;
`;

type MenuButtonProps = {
    highlight?: boolean
}
const MenuButton = styled.button<MenuButtonProps>`
  display: flex;
  font-size: 1.9rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.highlight ? colors.secondary : "transparent"};
  transition: background-color .5s;
`;

type TextSpanProps = {
    disappear?: boolean
}
const TextSpan = styled.span<TextSpanProps>`
  font-size: 2rem;
  color: ${colors.secondary};
  opacity: ${props => props.disappear ? 0 : 1};
  transition: opacity .5s;
`;

export default SelectRoles;