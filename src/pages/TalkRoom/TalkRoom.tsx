import React, {useContext} from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {GameplayContext} from "../../contexts/GameplayContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTheaterMasks, faHandPaper} from "@fortawesome/free-solid-svg-icons";
import {colorWithOpacity} from "../../utilities/colors";
import Players from "./Players";
import PageLayout from "../../components/PageLayout";


const TalkRoom = () => {
    const [{displayRoles}, dispatch] = useContext(GameplayContext);

    const toggleDisplayRoles = () => dispatch({type: "TOGGLE_DISPLAY_ROLES"});

    return (
        <PageLayout pageTitle={"گفتگو"}>
            {() => {
                return {
                    content: <Players/>,
                    menuContent: <>
                        <ToggleRolesButton displayRoles={displayRoles} onClick={toggleDisplayRoles}>
                            <FontAwesomeIcon icon={faTheaterMasks}/>
                        </ToggleRolesButton>
                        <VoteButton>
                            <FontAwesomeIcon icon={faHandPaper}/>
                            <FontAwesomeIcon icon={faHandPaper}/>
                            <FontAwesomeIcon icon={faHandPaper}/>
                        </VoteButton>
                    </>,
                };
            }}
        </PageLayout>
    );
};

type ToggleRolesButtonProps = {
    displayRoles: boolean
}
const ToggleRolesButton = styled.button<ToggleRolesButtonProps>`
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.displayRoles ? colors.secondary : "transparent"};
  transition: background-color .4s;
`;

const VoteButton = styled.button`
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  width: 4rem;
  height: 4rem;

  svg {
    grid-row: 1/1;
    grid-column: 1/1;

    &:nth-of-type(1) {
      color: ${colors.secondary};
      margin-left: -.7rem;
      transform: rotate(-30deg);
    }

    &:nth-of-type(2) {
      transform: rotate(30deg);
      margin-left: .7rem;
    }

    &:nth-of-type(3) {
      color: ${colorWithOpacity(colors.primaryDark, .85)};
      z-index: 1;
    }
  }
`;

export default TalkRoom;