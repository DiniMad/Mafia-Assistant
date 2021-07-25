import React, {useContext, useEffect, useState} from "react";
import {GameplayPlayer, GameplayPlayerRole} from "../../../types/Gameplay";
import {PersistentPlayer, PersistentPlayerRole} from "../../../types/PersistentData";
import {PersistentRolesContext} from "../../../contexts/PersistentRolesContext";
import {PersistentPlayersContext} from "../../../contexts/PersistentPlayersContext";
import {v4 as uuid} from "uuid";

const generateGameplayRoles = (roles: PersistentPlayerRole[]) => {
    return roles.flatMap(role => {
        const rolesArray: GameplayPlayerRole[] = Array.from({length: role.count},
            () => {
                return {
                    ...role,
                    revealed: false,
                };
            });
        return [...rolesArray];
    });
};
const shuffleRoles = (roles: GameplayPlayerRole[]) => {
    let currentIndex = roles.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [roles[currentIndex], roles[randomIndex]] = [roles[randomIndex], roles[currentIndex]];
    }

    return roles;
};
const initializeGameplayPlayers = (players: PersistentPlayer[], roles: GameplayPlayerRole[]) => {
    return players
        .filter(player => player.selected)
        .map<GameplayPlayer>((player, index) => {
            return {
                ...player,
                role: roles[index],
                active:true,
                talking: false,
                talked: false,
            };
        });
};

const useInitializePlayers = (): [GameplayPlayer[], () => void] => {
    const [persistentPlayers] = useContext(PersistentPlayersContext);
    const [persistedRoles] = useContext(PersistentRolesContext);

    const [players, setPlayers] = useState<GameplayPlayer[]>([]);
    const [dependencies, setDependencies] = useState(uuid());

    useEffect(() => {
        const selectedPersistedRoles = persistedRoles.filter(role => role.selected);
        const gameplayRoles = generateGameplayRoles(selectedPersistedRoles);
        const randomizeRoles = shuffleRoles(gameplayRoles);
        const players = initializeGameplayPlayers(persistentPlayers, randomizeRoles);
        setPlayers(players);
    }, [dependencies]);

    const reshuffleRoles = () => setDependencies(uuid());

    return [players, reshuffleRoles];
};

export default useInitializePlayers;