import React, {useContext, useState} from "react";
import {GameplayPlayer} from "../../../types/Gameplay";
import {GameplayContext} from "../../../contexts/GameplayContext";

const calculateMinimumVotesRequiredToDefence = (players: GameplayPlayer[]) => {
    const activePlayers = players.filter(player => player.active);
    return Math.ceil(activePlayers.length / 2);
};

const useVote = () => {
    const [{players}] = useContext(GameplayContext);
    const [playerShouldDefence, setPlayerShouldDefence] = useState<GameplayPlayer["id"][]>([]);

    const vote = (playerId: GameplayPlayer["id"]) => {
        setPlayerShouldDefence(playerIds => {
            const voteExist = playerIds.includes(playerId);
            return voteExist ? playerIds.filter(id => id !== playerId) : [...playerIds, playerId];
        });
    };

    return {
        playerShouldDefence,
        vote,
        minimumVotesCount: calculateMinimumVotesRequiredToDefence(players),
    };
};

export default useVote;