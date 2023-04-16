import {RoleType} from "@/types/roleType";
import {RoleKey, RoleSide} from "@/store/godfather/godfatherSlice";

export const roles: RoleType<RoleKey, RoleSide>[] = [
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