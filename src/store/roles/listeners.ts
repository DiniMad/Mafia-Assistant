import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {AppState} from "@/store";
import {
    decrementRoleQuantity,
    incrementRoleQuantity,
    initializeRolesFromData,
    toggleSelectRole,
} from "@/store/roles/rolesSlice";
import {rolesStorageKey} from "@/store/roles/index";

export const rolesListener = createListenerMiddleware();

rolesListener.startListening({
    matcher: isAnyOf(initializeRolesFromData,
        toggleSelectRole,
        decrementRoleQuantity,
        incrementRoleQuantity),

    effect: async (action, listenerApi) => {
        const appState = listenerApi.getState() as AppState;
        const roles = appState.roles;
        localStorage.setItem(rolesStorageKey, JSON.stringify(roles));
    },
});