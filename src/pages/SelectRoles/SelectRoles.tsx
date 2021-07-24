import React, {useContext} from "react";
import PageLayout from "../../components/PageLayout";
import Role from "./Role";
import styled from "styled-components";
import {colors} from "../../utilities";
import {PersistentRolesContext} from "../../contexts/PersistentRolesContext";
import useRoleState from "./hooks/useRoleState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faTheaterMasks} from "@fortawesome/free-solid-svg-icons";


const SelectRoles = () => {
    const [roles] = useContext(PersistentRolesContext);
    const {statuses, isSelectionValid, error} = useRoleState();

    return (
        <PageLayout pageTitle={"انتخاب نقش ها"}>
            {() => {
                return {
                    content: <>
                        <Status>
                            <TextSpan>{statuses.players}</TextSpan>
                            <TextSpan>&nbsp;و&nbsp;</TextSpan>
                            <TextSpan>{statuses.roles}</TextSpan>
                            <TextSpan>,&nbsp;</TextSpan>
                            <TextSpan>{statuses.citizens}</TextSpan>
                            <TextSpan>&nbsp;و&nbsp;</TextSpan>
                            <TextSpan>{statuses.mafias}</TextSpan>
                        </Status>
                        <Roles>{roles.map(role => <Role key={role.name} {...role}/>)}</Roles>
                    </>,
                    menuContent: <>
                        <MenuButton>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </MenuButton>
                        <TextSpan disappear={isSelectionValid} highlight>{error}</TextSpan>
                        <MenuButton highlightColor={isSelectionValid} disabled={!isSelectionValid}>
                            <FontAwesomeIcon icon={faTheaterMasks}/>
                        </MenuButton>
                    </>,
                };
            }}
        </PageLayout>
    );
};

const Status = styled.h2`
  text-align: center;
  direction: rtl;
  border-bottom: ${colors.primaryLight} solid .4rem;
  padding: 1rem;
`;

type TextSpanProps = {
    highlight?: boolean,
    disappear?: boolean
}
const TextSpan = styled.span<TextSpanProps>`
  font-size: 2rem;
  color: ${props => props.highlight ? colors.secondary : colors.white};
  opacity: ${props => props.disappear ? 0 : 1};
  transition: opacity .5s;
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
    highlightColor?: boolean
}
const MenuButton = styled.button<MenuButtonProps>`
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.highlightColor ? colors.secondary : "transparent"};
  transition: background-color .5s;
`;

export default SelectRoles;