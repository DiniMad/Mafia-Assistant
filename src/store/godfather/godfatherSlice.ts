import {createSlice} from "@reduxjs/toolkit";
import {RoleType} from "@/types/roleType";
import {roles} from "@/store/godfather/data";
import reducers from "@/store/godfather/reducers";

export type RoleKey =
    "godfather" | "saul" | "matador" | "mafia" | "nostradamus" |
    "watson" | "leon" | "kane" | "constantine" | "citizen";
export type RoleSide = "Citizen" | "Mafia" | "Independent";
export type GodfatherRoleType = RoleType<RoleKey, RoleSide>;

export type GodfatherState = {
    roles: GodfatherRoleType[]
}
const initialState: GodfatherState = {
    roles: roles,
};

export const godfatherSlice = createSlice({
    name: "godfather",
    initialState,
    reducers: reducers,
});

export const {
    toggleSelectRole,
    decrementRoleQuantity,
    incrementRoleQuantity,
} = godfatherSlice.actions;

export const godfatherReducer = godfatherSlice.reducer;