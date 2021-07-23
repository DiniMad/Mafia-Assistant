import React, {createContext, Dispatch, FC, useReducer} from "react";
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

    return mockPlayers;
};

type PlayerContextType = [PersistentPlayer[], Dispatch<PlayerAction>];
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


// TODO: Replace the below mock implementation with the persistent storage data 
const selectedGenerator = () => Math.random() > .5;
const mockPlayers: PersistentPlayer[] = [
    {name: "سید محمد", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی", id: uuid(), selected: selectedGenerator()},
    {name: "سید مجتبی", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    // {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "دایی", id: uuid(), selected: selectedGenerator()},
    {name: "آقا محسن", id: uuid(), selected: selectedGenerator()},
    {name: "آقا محمد", id: uuid(), selected: selectedGenerator()},
    {name: "سید حسین", id: uuid(), selected: selectedGenerator()},
];