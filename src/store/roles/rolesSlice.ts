import {createSlice} from "@reduxjs/toolkit";
import {RoleType} from "@/types/roleType";
import reducers from "@/store/roles/reducers";


export type RolesState<RoleKey extends string, RoleSide extends string> = {
    entities: RoleType<RoleKey, RoleSide>[]
}
const initialState: RolesState<any, any> = {
    entities: [],
};

export const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: reducers,
});

export const {
    initializeRolesFromData,
    toggleSelectRole,
    decrementRoleQuantity,
    incrementRoleQuantity,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;