import {PersistentPlayerRole} from "./types/PersistentData";
import {Config} from "./types/Gameplay";

export const PLAYER_ROLES: PersistentPlayerRole[] = [
    {name: "رئیس مافیا", shortName: "رئیس", side: "Mafia", variety: "One", selected: false, count: 1},
    {name: "مذاکره کننده", shortName: "مذاکره", side: "Mafia", variety: "One", selected: false, count: 1},
    {name: "ناتو", shortName: "ناتو", side: "Mafia", variety: "One", selected: false, count: 1},
    {name: "گروگانگیر", shortName: "گروگانگیر", side: "Mafia", variety: "One", selected: false, count: 1},
    {name: "دکتر لکتر", shortName: "لکتر", side: "Mafia", variety: "One", selected: false, count: 1},
    {name: "مافیا ساده", shortName: "مافیا", side: "Mafia", variety: "Many", selected: false, count: 1},
    {name: "کاراگاه", shortName: "کاراگاه", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "پزشک", shortName: "پزشک", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "تیرانداز", shortName: "تیرانداز", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "زره پوش", shortName: "زره", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "تفنگدار", shortName: "تفنگدار", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "نگهبان", shortName: "نگهبان", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "خبرنگار", shortName: "خبرنگار", side: "Citizen", variety: "One", selected: false, count: 1},
    {name: "شهروند ساده", shortName: "شهروند", side: "Citizen", variety: "Many", selected: false, count: 1},
];

export const CONFIG: Config = {
    talkTime: 30,
    challengeTime: 15,
    defenseTime: 45,
};