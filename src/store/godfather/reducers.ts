import {PayloadAction} from "@reduxjs/toolkit";
import {GodfatherRoleType, GodfatherState} from "@/store/godfather/godfatherSlice";

type ToggleSelectRoleAction = PayloadAction<{
    roleKey: GodfatherRoleType["key"]
}>
type DecrementRoleQuantityAction = PayloadAction<{
    roleKey: GodfatherRoleType["key"]
}>
type IncrementRoleQuantity = PayloadAction<{
    roleKey: GodfatherRoleType["key"]
}>

const toggleSelectRole = (state: GodfatherState, action: ToggleSelectRoleAction) => {
    const role = state.roles.find(r => r.key === action.payload.roleKey);
    if (role === undefined) return;

    role.selected = !role.selected;
};
const decrementRoleQuantity = (state: GodfatherState, action: DecrementRoleQuantityAction) => {
    const role = state.roles.find(r => r.key === action.payload.roleKey);
    if (role === undefined || role.variety === "One") return;

    role.count = role.count - 1;
};
const incrementRoleQuantity = (state: GodfatherState, action: IncrementRoleQuantity) => {
    const role = state.roles.find(r => r.key === action.payload.roleKey);
    if (role === undefined || role.variety === "One") return;

    role.count = role.count + 1;
};

export default {toggleSelectRole, decrementRoleQuantity, incrementRoleQuantity};