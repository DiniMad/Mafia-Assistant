import {PayloadAction} from "@reduxjs/toolkit";
import {RoleType} from "@/types/roleType";
import {RolesState} from "@/store/roles/rolesSlice";
import data from "@/store/roles/data";

type InitializeRolesFromDataAction = PayloadAction<{
    dataKey: keyof typeof data
}>
type ToggleSelectRoleAction = PayloadAction<{
    roleKey: RoleType<any, any>["key"]
}>
type DecrementRoleQuantityAction = PayloadAction<{
    roleKey: RoleType<any, any>["key"]
}>
type IncrementRoleQuantity = PayloadAction<{
    roleKey: RoleType<any, any>["key"]
}>

const initializeRolesFromData = (state: RolesState<any, any>, action: InitializeRolesFromDataAction) => {
    state.dataKey = action.payload.dataKey;
    state.entities = data[action.payload.dataKey];
};

const toggleSelectRole = (state: RolesState<any, any>, action: ToggleSelectRoleAction) => {
    const role = state.entities.find(r => r.key === action.payload.roleKey);
    if (role === undefined) return;

    role.selected = !role.selected;
};
const decrementRoleQuantity = (state: RolesState<any, any>, action: DecrementRoleQuantityAction) => {
    const role = state.entities.find(r => r.key === action.payload.roleKey);
    if (role === undefined || role.variety === "One") return;

    role.count = Math.max(role.count - 1, 1);
};
const incrementRoleQuantity = (state: RolesState<any, any>, action: IncrementRoleQuantity) => {
    const role = state.entities.find(r => r.key === action.payload.roleKey);
    if (role === undefined || role.variety === "One") return;

    role.count = role.count + 1;
};

export default {
    initializeRolesFromData,
    toggleSelectRole,
    decrementRoleQuantity,
    incrementRoleQuantity,
};