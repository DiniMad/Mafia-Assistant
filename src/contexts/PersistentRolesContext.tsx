import React, {createContext, Dispatch, FC} from "react";
import {useStorageReducer} from "react-storage-hooks";
import {PersistentPlayerRole, PersistentPlayerRoleVariety} from "../types/PersistentData";
import {PLAYER_ROLES} from "../initial-configs";

type TogglePersistentRolesAction = {
    type: "TOGGLE_SELECTION",
    payload: PersistentPlayerRole["name"]
}
type SetCountPersistentRolesAction = {
    type: "SET_COUNT",
    payload: Pick<PersistentPlayerRole, "name"> & PersistentPlayerRoleVariety
}
type PersistentRolesAction = TogglePersistentRolesAction | SetCountPersistentRolesAction;
const reducer = (state: PersistentPlayerRole[], action: PersistentRolesAction) => {
    if (action.type === "TOGGLE_SELECTION") {
        return state.map(role => {
            if (role.name === action.payload)
                return {
                    ...role,
                    selected: !role.selected,
                };
            return role;
        });
    }

    if (action.type === "SET_COUNT") {
        return state.map(role => {
            if (role.name === action.payload.name)
                return {
                    ...role,
                    ...action.payload,
                };
            return role;
        });
    }

    return state;
};

type PersistentRolesContextType = [PersistentPlayerRole[], Dispatch<PersistentRolesAction>];
export const PersistentRolesContext = createContext<PersistentRolesContextType>({} as PersistentRolesContextType);
export const PersistentRolesProvider: FC = ({children}) => {
    const [state, dispatch] = useStorageReducer(localStorage, "ROLES", reducer, PLAYER_ROLES);

    return (
        <PersistentRolesContext.Provider value={[state, dispatch]}>
            {children}
        </PersistentRolesContext.Provider>
    );
};