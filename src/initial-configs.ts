import {PersistentPlayerRole} from "./types/PersistentData";

export const PLAYER_ROLES: PersistentPlayerRole[] = [
    {name: "رئیس مافیا", shortName: "رئیس", side: "Mafia", variety: "One", selected: false},
    {name: "مذاکره کننده", shortName: "مذاکره", side: "Mafia", variety: "One", selected: false},
    {name: "مافیا ساده", shortName: "مافیا", side: "Mafia", variety: "Many", selected: false},
    {name: "کاراگاه", shortName: "کاراگاه", side: "Citizen", variety: "One", selected: false},
    {name: "پزشک", shortName: "پزشک", side: "Citizen", variety: "One", selected: false},
    {name: "تیرانداز", shortName: "تیرانداز", side: "Citizen", variety: "One", selected: false},
    {name: "زره پوش", shortName: "زره", side: "Citizen", variety: "One", selected: false},
    {name: "شهروند ساده", shortName: "شهروند", side: "Citizen", variety: "Many", selected: false},
];