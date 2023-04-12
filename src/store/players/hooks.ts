import {useAppSelector} from "@/store/hooks";

export const usePlayers = () => {
    return useAppSelector(state => state.players.entities);
};
