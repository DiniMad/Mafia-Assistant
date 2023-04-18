import {RoleType} from "@/types/roleType";

type RoleKey =
    "godfather" | "saul" | "matador" | "mafia" | "nostradamus" |
    "watson" | "leon" | "kane" | "constantine" | "citizen";
type RoleSide = "Citizen" | "Mafia" | "Independent";
export type GodfatherRoleType = RoleType<RoleKey, RoleSide>;
const godfather: GodfatherRoleType[] = [
    {
        "key": "godfather",
        "side": "Mafia",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "saul",
        "side": "Mafia",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "matador",
        "side": "Mafia",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "mafia",
        "side": "Mafia",
        "variety": "Many",
        "count": 1,
    },
    {
        "key": "nostradamus",
        "side": "Independent",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "watson",
        "side": "Citizen",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "leon",
        "side": "Citizen",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "kane",
        "side": "Citizen",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "constantine",
        "side": "Citizen",
        "variety": "One",
        "count": 1,
    },
    {
        "key": "citizen",
        "side": "Citizen",
        "variety": "Many",
        "count": 1,
    },
];

export default {godfather};