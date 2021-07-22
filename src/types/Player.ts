import {v4 as uuid} from "uuid";

type Player = {
    id: string,
    name: string,
    selected: boolean,
}

// TODO: Replace the mocking players with the actual implementation.
const selectedGenerator = () => Math.random() > .5;
export const mockPlayers: Player[] = [
    {name: "سید محمد", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی", id: uuid(), selected: selectedGenerator()},
    {name: "سید مجتبی", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "سید علی میری", id: uuid(), selected: selectedGenerator()},
    {name: "دایی", id: uuid(), selected: selectedGenerator()},
    {name: "آقا محسن", id: uuid(), selected: selectedGenerator()},
    {name: "آقا محمد", id: uuid(), selected: selectedGenerator()},
    {name: "سید حسین", id: uuid(), selected: selectedGenerator()},
];

export default Player;