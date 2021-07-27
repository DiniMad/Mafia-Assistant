import React, {useContext, useRef} from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import useInput from "./hooks/useInput";
import {PersistentPlayersContext} from "../../contexts/PersistentPlayersContext";

const NewPlayer = () => {
    const [, dispatch] = useContext(PersistentPlayersContext);
    const [newPlayerName, newPlayerInputOnChange, resetInputText] = useInput({maxLength: 30});
    const inputElement = useRef<HTMLInputElement>(null);

    const newPlayerButtonClicked = () => {
        if (!newPlayerName) return;

        dispatch({
            type: "ADD_PLAYER",
            payload: newPlayerName,
        });

        resetInputText();
        if (!inputElement.current) return;
        inputElement.current.focus();
    };

    return (
        <NewPlayerComponent>
            <PlayerInput value={newPlayerName}
                         onChange={newPlayerInputOnChange}
                         ref={inputElement}
                         placeholder={"نام بازیکن"}/>
            <MenuButton onClick={newPlayerButtonClicked}>
                <FontAwesomeIcon icon={faCheck}/>
            </MenuButton>
        </NewPlayerComponent>
    );
};


const NewPlayerComponent = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  justify-self: stretch;
  align-items: stretch;
  border-radius: .6rem;
  margin: 1rem .8rem;
  height: 4rem;
  background-color: ${colors.primaryLight};

`;

const PlayerInput = styled.input`
  grid-column: 1/3;
  grid-row: 1;
  font-size: 1.9rem;
  text-align: center;
  direction: rtl;
  color: ${colors.white};
  outline: none;
  border: none;
  padding: .5rem 5rem;
  width: 100%;
  background-color: ${colors.primaryLight};
`;

const MenuButton = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  padding: .5rem 1.2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.primaryDark};
`;
export default NewPlayer;