import React, {createContext, Dispatch, FC, useReducer} from "react";
import {Gameplay, GameplayPlayer} from "../types/Gameplay";

type SetPlayersGameplayAction = {
    type: "SET_PLAYERS",
    payload: GameplayPlayer[]
}
type DisplayRolesGameplayAction = {
    type: "TOGGLE_DISPLAY_ROLES",
}
type RevealRoleGameplayAction = {
    type: "REVEAL_ROLE",
    payload: GameplayPlayer["id"]
}
type GameplayAction = SetPlayersGameplayAction | DisplayRolesGameplayAction | RevealRoleGameplayAction;
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

    if (action.type === "REVEAL_ROLE") {
        const players = state.players.map(player => {
            if (player.id === action.payload)
                return {
                    ...player,
                    role: {
                        ...player.role,
                        revealed: true,
                    },
                };
            return player;
        });

        return {
            ...state,
            players,
        };
    }

    return state;
};

type GameplayContextType = [Gameplay, Dispatch<GameplayAction>]
export const GameplayContext = createContext<GameplayContextType>({} as GameplayContextType);
export const GameplayProvider: FC = ({children}) => {
    const initialState: Gameplay = {
        players: [],
        displayRoles: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameplayContext.Provider value={[state, dispatch]}>
            {children}
        </GameplayContext.Provider>
    );
};