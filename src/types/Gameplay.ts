import Player from "./Player";

type PlayerRole = {
    name: string,
    shortName: string,
}
const PlayerRoles: PlayerRole[] = [
    {name: "رئیس مافیا", shortName: "رئیس"},
    {name: "مذاکره کننده", shortName: "مذاکره"},
    {name: "مافیا ساده", shortName: "مافیا"},
    {name: "کاراگاه", shortName: "کاراگاه"},
    {name: "پزشک", shortName: "پزشک"},
    {name: "تیرانداز", shortName: "تیرانداز"},
    {name: "زره پوش", shortName: "زره"},
    {name: "شهروند ساده", shortName: "شهروند"},
];

export type GameplayPlayer = Omit<Player, "selected"> & {
    talked: boolean,
    talking: boolean,
    role: PlayerRole
}

export type Gameplay = {
    players: GameplayPlayer[],
    displayRoles: boolean,
}

// TODO: Remove the mock initialization.
export const generatePlayers = (players: Player[]) => {
    return players.map((player, index) => {
        const gameplayPlayer: GameplayPlayer = {
            ...player,
            talked: index < 3,
            talking: index === 3,
            role: PlayerRoles[Math.floor(Math.random() * PlayerRoles.length)],
        };
        return gameplayPlayer;
    });
};