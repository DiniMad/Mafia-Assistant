import {GodfatherRoleType} from "@/store/roles";
import citizen from "@images/roles/citizen.jpg";
import godfather from "@images/roles/godfather.jpg";
import saul from "@images/roles/saul.jpg";
import matador from "@images/roles/matador.jpg";
import mafia from "@images/roles/mafia.jpg";
import nostradamus from "@images/roles/nostradamus.jpg";
import watson from "@images/roles/watson.jpg";
import leon from "@images/roles/leon.jpg";
import kane from "@images/roles/kane.jpg";
import constantine from "@images/roles/constantine.jpg";


const imagesMap: { [_ in GodfatherRoleType["key"]]: any } = {
    citizen: citizen,
    godfather: godfather,
    saul: saul,
    matador: matador,
    mafia: mafia,
    nostradamus: nostradamus,
    watson: watson,
    leon: leon,
    kane: kane,
    constantine: constantine,
};
export const getImage = (key: GodfatherRoleType["key"]) => imagesMap[key];