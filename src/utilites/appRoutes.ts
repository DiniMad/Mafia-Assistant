export default {
    home: "/",
    godfather: {
        "*": "godfather/*",
        index: "godfather",
        roleSelection: "role",
        revealRoles: "reveal",
        gameFlow: "game",
        pathTo: function <T extends keyof Omit<typeof this, "*" | "pathTo">>(path: T) {
            if (path === "index") return `/${this.index}`;
            return `/${this.index}/${this[path]}`;
        },
    },
} as const;