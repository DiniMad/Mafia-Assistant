export default {
    home: "/",
    players: "/players",
    godfather: {
        "*": "godfather/*",
        index: "godfather",
        roleSelection: "role",
        revealRoles: "reveal",
        gameFlow: "game",
        pathTo: function <T extends "" | string & ValueOf<Omit<typeof this, "*" | "index">>>(path: T):
            `/${typeof this.index}/${T}` {
            return `/${this.index}/${path}`;
        },
    },
} as const;

type ValueOf<T> = T[keyof T];


