import React, {createContext, Dispatch, FC, useContext, useEffect, useReducer} from "react";
import {Gameplay, GameplayPlayer, generatePlayers} from "../types/Gameplay";
import {PersistentPlayersContext} from "./PersistentPlayersContext";

type SetPlayersGameplayAction = {
    type: "SET_PLAYERS",
    payload: GameplayPlayer[]
}
type DisplayRolesGameplayAction = {
    type: "TOGGLE_DISPLAY_ROLES",
}
type GameplayAction = SetPlayersGameplayAction | DisplayRolesGameplayAction;
const reducer = (state: Gameplay, action: GameplayAction) => {
    if (action.type === "SET_PLAYERS") {
        return {
            ...state,
            players: action.payload,
        };
    }

    if (action.type === "TOGGLE_DISPLAY_ROLES") {
        return {
            ...state,
            displayRoles: !state.displayRoles,
        };
    }

    return state;
};

type GameplayContextType = [Gameplay, Dispatch<GameplayAction>]
export const GameplayContext = createContext<GameplayContextType>({} as GameplayContextType);
export const GameplayProvider: FC = ({children}) => {
    // TODO: Initialize the players from the persistent storage.
    const initialState: Gameplay = {
        players: [],
        displayRoles: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    // TODO: Temporary Initialization
    const [players] = useContext(PersistentPlayersContext);
    useEffect(() => {
        dispatch({
            type: "SET_PLAYERS",
            payload: generatePlayers(players),
        });
    }, [...players]);

    return (
        <GameplayContext.Provider value={[state, dispatch]}>
            {children}
        </GameplayContext.Provider>
    );
};

export default GameplayContext;