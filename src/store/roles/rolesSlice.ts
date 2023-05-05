import {createSlice} from "@reduxjs/toolkit";
import {RoleType} from "@/types/roleType";
import reducers from "@/store/roles/reducers";
import data from "@/store/roles/data";
import {initializeRolesFromStorage} from "@/store/roles/thunk";


export type RolesState<RoleKey extends string, RoleSide extends string> = {
    dataKey?: keyof typeof data | "pending",
    entities: RoleType<RoleKey, RoleSide>[]
}
const initialState: RolesState<string, string> = {
    entities: [],
};

export const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: reducers,
    extraReducers: builder => {
        builder.addCase(initializeRolesFromStorage.pending,
            (state) => {
                state.dataKey = "pending";
            });
        builder.addCase(initializeRolesFromStorage.fulfilled,
            (state, action) => {
                state.dataKey = action.payload.dataKey;
                state.entities = action.payload.entities;
            });
    },
});

export const {
    initializeRolesFromData,
    toggleSelectRole,
    decrementRoleQuantity,
    incrementRoleQuantity,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;