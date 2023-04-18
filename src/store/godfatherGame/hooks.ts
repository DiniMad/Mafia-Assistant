import {useAppSelector} from "@/store/hooks";

export const useGodfatherGamePlayers = () =>
    useAppSelector(state => state.godfatherGame.players);

