type ValueOf<T> = T[keyof T];
type AppRouteType = typeof appRoutes.godfather | typeof appRoutes.godfather.gameFlow

const appRoutes = {
    home: "/",
    players: "/players",
    godfather: {
        "*": "godfather/*",
        index: "godfather",
        parent: "",
        roleSelection: "role",
        revealRoles: "reveal",
        gameFlow: {
            "*": "game/*",
            index: `game`,
            parent: "/godfather",
            dayTalk: "dayTalk",
            pathTo,
        },
        pathTo,
    },
} as const;

function pathTo<TT extends typeof appRoutes.godfather,
    T extends "" | string & ValueOf<Omit<TT, "*" | "index" | "parent">>>(this: TT, path: T):
    `${typeof this.parent}/${typeof this.index}/${T}`;
function pathTo<TT extends typeof appRoutes.godfather.gameFlow,
    T extends "" | string & ValueOf<Omit<TT, "*" | "index" | "parent">>>(this: TT, path: T):
    `${typeof this.parent}/${typeof this.index}/${T}`;
function pathTo<TT extends AppRouteType, T extends "" | string & ValueOf<Omit<TT, "*" | "index" | "parent">>>(this: TT, path: T):
    `${typeof this.parent}/${typeof this.index}/${T}` {
    return `${this.parent}/${this.index}/${path}`;
}

export default appRoutes;