import React, {createContext, Dispatch, FC} from "react";
import {useStorageReducer} from "react-storage-hooks";
import {PersistentPlayer} from "../types/PersistentData";
import {v4 as uuid} from "uuid";

type SelectPlayerAction = {
    type: "SELECT_PLAYER",
    payload: PersistentPlayer["id"]
}
type ReorderPlayerAction = {
    type: "REORDER_PLAYER",
    payload: PersistentPlayer[]
}
type RemovePlayerAction = {
    type: "REMOVE_PLAYER",
    payload: PersistentPlayer["id"]
}
type AddPlayerAction = {
    type: "ADD_PLAYER",
    payload: PersistentPlayer["name"]
}
type PersistentPlayerAction = SelectPlayerAction | ReorderPlayerAction | RemovePlayerAction | AddPlayerAction
const reducer = (state: PersistentPlayer[], action: PersistentPlayerAction) => {
    if (action.type === "SELECT_PLAYER") {
        return state.map(player =>
            player.id === action.payload ?
                {...player, selected: !player.selected} :
                player,
        );
    }

    if (action.type === "REORDER_PLAYER") {
        return action.payload;
    }

    if (action.type === "REMOVE_PLAYER") {
        return state.filter(player => player.id !== action.payload);
    }

    if (action.type === "ADD_PLAYER") {
        return [
            ...state,
            {
                id: uuid(),
                name: action.payload,
                selected: false,
            },
        ];
    }

    return state;
};

type PersistentPlayerContextType = [PersistentPlayer[], Dispatch<PersistentPlayerAction>];
export const PersistentPlayersContext = createContext<PersistentPlayerContextType>({} as PersistentPlayerContextType);
export const PersistentPlayersProvider: FC = ({children}) => {
    const [state, dispatch] = useStorageReducer(localStorage, "PLAYERS", reducer, []);

    return (
        <PersistentPlayersContext.Provider value={[state, dispatch]}>
            {children}
        </PersistentPlayersContext.Provider>
    );
};