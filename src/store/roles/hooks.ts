import {useAppSelector} from "@/store/hooks";
import {RoleType} from "@/types/roleType";

export const useRoles = <T extends RoleType<string, string>>() => {
    return useAppSelector(state => state.roles.entities as T[]);
};
export const useRoleDataKey = () => {
    return useAppSelector(state => state.roles.dataKey);
};
