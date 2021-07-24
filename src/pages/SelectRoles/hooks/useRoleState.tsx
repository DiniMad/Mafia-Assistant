import React, {useContext} from "react";
import {PersistentPlayersContext} from "../../../contexts/PersistentPlayersContext";
import {PersistentRolesContext} from "../../../contexts/PersistentRolesContext";

type Validations = {
    isRolesCountMatchPlayersCount: boolean,
    isCitizenCountValid: boolean,
    isMafiaCountValid: boolean,
    isCitizensCountMoreThanMafiasCount: boolean,
    isSelectionValid: boolean,
}

const generateStatusTexts = (playersCount: number, citizensCount: number, mafiasCount: number) => {
    const player = `${playersCount} ${"بازیکن"}`;
    const citizen = `${citizensCount} ${"شهروند"}`;
    const mafia = `${mafiasCount} ${"مافیا"}`;
    const roles = `${citizensCount + mafiasCount} ${"نقش"}`;

    return {players: player, citizens: citizen, mafias: mafia, roles};
};
const generateValidations = (playersCount: number, citizensCount: number, mafiasCount: number) => {
    const rolesCount = citizensCount + mafiasCount;
    const isCitizenCountValid = citizensCount > 0;
    const isMafiaCountValid = mafiasCount > 0;
    const isCitizensCountMoreThanMafiasCount = citizensCount > mafiasCount;
    const isRolesCountMatchPlayersCount = rolesCount === playersCount;
    const isSelectionValid =
        isRolesCountMatchPlayersCount && isCitizenCountValid && isMafiaCountValid && isCitizensCountMoreThanMafiasCount;

    return {
        isCitizenCountValid,
        isMafiaCountValid,
        isCitizensCountMoreThanMafiasCount,
        isRolesCountMatchPlayersCount,
        isSelectionValid,
    };
};
const generateErrorText = (validations: Omit<Validations, "isSelectionValid">) => {
    if (!validations.isCitizenCountValid) return "تعداد شهروندان بیشتر از صفر";
    if (!validations.isMafiaCountValid) return "تعداد مافیا بیشتر از صفر";
    if (!validations.isCitizensCountMoreThanMafiasCount) return "تعداد شهروندان بیشتر از مافیا";
    if (!validations.isRolesCountMatchPlayersCount) return "تعداد نقش ها برابر تعداد بازیکنان";
};

const useRoleState = () => {
    const [players] = useContext(PersistentPlayersContext);
    const [roles] = useContext(PersistentRolesContext);

    const selectedPlayersCount = players.filter(player => player.selected).length;
    const selectedCitizenRolesCount = roles
        .filter(role => role.selected && role.side === "Citizen")
        .map(role => role.count)
        .reduce((c1, c2) => c1 + c2, 0);
    const selectedMafiaRolesCount = roles
        .filter(player => player.selected && player.side === "Mafia")
        .map(role => role.count)
        .reduce((c1, c2) => c1 + c2, 0);

    const statuses = generateStatusTexts(selectedPlayersCount, selectedCitizenRolesCount, selectedMafiaRolesCount);
    const validations = generateValidations(selectedPlayersCount, selectedCitizenRolesCount, selectedMafiaRolesCount);
    const error = generateErrorText(validations);

    return {statuses, isSelectionValid: validations.isSelectionValid, error};
};

export default useRoleState;