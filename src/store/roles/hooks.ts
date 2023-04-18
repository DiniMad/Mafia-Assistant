import {useAppSelector} from "@/store/hooks";

export const useRoles = () => {
    return useAppSelector(state => state.roles.entities);
};
