import {createAsyncThunk} from "@reduxjs/toolkit";
import {RolesState, rolesStorageKey} from "@/store/roles";

export const initializeRolesFromStorage = createAsyncThunk(
    "roles/initializeFromStorage",
    (): RolesState<string, string> => {
        const rolesJson = localStorage.getItem(rolesStorageKey);
        if (rolesJson === null) return {entities: []};

        return JSON.parse(rolesJson);
    },
);