import React, {createContext, Dispatch, FC} from "react";
import {useStorageReducer} from "react-storage-hooks";
import {PersistentPlayer} from "../types/PersistentData";

type SelectPlayerAction = {
    type: "SELECT_PLAYER",
    payload: PersistentPlayer["id"]
}
type ReorderPlayerAction = {
    type: "REORDER_PLAYER",
    payload: PersistentPlayer[]
}
type PlayerAction = SelectPlayerAction | ReorderPlayerAction
const reducer = (state: PersistentPlayer[], action: PlayerAction) => {
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

    return state;
};

type PlayerContextType = [PersistentPlayer[], Dispatch<PlayerAction>];
export const PlayersContext = createContext<PlayerContextType>({} as PlayerContextType);
export const PlayersProvider: FC = ({children}) => {
    const [state, dispatch] = useStorageReducer(localStorage, "PLAYERS", reducer, []);

    return (
        <PlayersContext.Provider value={[state, dispatch]}>
            {children}
        </PlayersContext.Provider>
    );
};

export default PlayersContext;