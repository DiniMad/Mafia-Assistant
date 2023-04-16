import {useAppSelector} from "@/store/hooks";

export const useGodfatherRoles = () => {
    return useAppSelector(state => state.godfather.roles);
};
