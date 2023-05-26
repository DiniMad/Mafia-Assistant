import React from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";
import {useTranslation} from "react-i18next";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    playerRole: GodfatherPlayer["roleKey"],
    active: boolean,
    selected: boolean,
    revealRole: boolean,
    select: (playedId: GodfatherPlayer["id"]) => void
}
const ActedOnPlayer = ({playerId, playerName, playerRole, active, selected, revealRole, select}: PlayerProps) => {
    const {t} = useTranslation();
    const selectThePlayer = () => select(playerId);

    return (
        <PlayerComponent disabled={!active} selected={selected} onClick={selectThePlayer}>
            <PlayerName>{playerName}</PlayerName>
            <PlayerRole revealRole={revealRole}>
                {t(`godfather:role-${playerRole}`)}
            </PlayerRole>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.button`
  ${tw`disabled:bg-background-300 disabled:bg-opacity-70 grid grid-cols-[6fr 1fr] items-center text-white h-10 m-1.5`}
  ${({selected}: { selected: boolean }) =>
          selected ? tw`bg-accent-300` : tw`bg-background-300`}
`;

const PlayerName = tw.p`col-[1/3] row-[1] text-lg text-white text-center`;
const PlayerRole = styled.div`
  ${tw`col-[2/3] row-[1] z-[1] text-sm text-center`}
  ${({revealRole}: { revealRole: boolean }) => revealRole ? tw`block` : tw`hidden`}
`;

export default ActedOnPlayer;