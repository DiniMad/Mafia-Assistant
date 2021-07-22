import React, {createContext, Dispatch, FC, useReducer} from "react";
import Player, {mockPlayers} from "../types/Player";

type SelectPlayerAction = {
    type: "SELECT_PLAYER",
    payload: Player["id"]
}
type ReorderPlayerAction = {
    type: "REORDER_PLAYER",
    payload: Player[]
}
type PlayerAction = SelectPlayerAction | ReorderPlayerAction
const reducer = (state: Player[], action: PlayerAction) => {
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

    return mockPlayers;
};

type PlayerContextType = [Player[], Dispatch<PlayerAction>];
export const PlayersContext = createContext<PlayerContextType>({} as PlayerContextType);
export const PlayersProvider: FC = ({children}) => {
    const initialState = mockPlayers.sort((p1, p2) => {
        return (p1.selected === p2.selected) ? 0 : p1.selected ? -1 : 1;
    });
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PlayersContext.Provider value={[state, dispatch]}>
            {children}
        </PlayersContext.Provider>
    );
};

export default PlayersContext;