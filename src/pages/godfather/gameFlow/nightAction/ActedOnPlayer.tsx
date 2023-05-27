import React from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";
import {useTranslation} from "react-i18next";
import {Context} from "@/stateMachines/godfather/nightActionMachine";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    playerRole: GodfatherPlayer["roleKey"],
    mafiaAct: Context["mafiaAct"]
    active: boolean,
    selected: boolean,
    revealRole: boolean,
    revealMafiaAct: boolean,
    select: (playedId: GodfatherPlayer["id"]) => void
}
const ActedOnPlayer = ({
                           playerId,
                           playerName,
                           playerRole,
                           mafiaAct,
                           active,
                           selected,
                           revealRole,
                           revealMafiaAct,
                           select,
                       }: PlayerProps) => {
    const {t} = useTranslation();
    const selectThePlayer = () => select(playerId);

    const act =
        revealMafiaAct && mafiaAct?.player === playerId ? mafiaAct.act : undefined;

    return (
        <PlayerComponent disabled={!active} selected={selected} onClick={selectThePlayer}>
            <Action hidden={act === undefined}>
                {t(`godfather:${act!}`)}
            </Action>
            <PlayerName>{playerName}</PlayerName>
            <PlayerRole hidden={!revealRole}>
                {t(`godfather:role-${playerRole}`)}
            </PlayerRole>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.button`
  ${tw`bg-background-300 disabled:bg-background-300 disabled:bg-opacity-70 grid grid-cols-[1fr 3fr 1fr] items-center text-white h-10 m-1.5`}
  ${({selected}: { selected: boolean }) => selected && tw`bg-accent-300`}
`;

const Action = styled.p`
  ${tw`col-[1/2] row-[1] text-lg text-white text-center`}
  ${({hidden}: { hidden: boolean }) => hidden ? tw`hidden` : tw`block`}
`;
const PlayerName = tw.p`col-[2/3] row-[1] text-lg text-white text-center`;
const PlayerRole = styled.p`
  ${tw`col-[3/4] row-[1] z-[1] text-xs text-center text-clip`}
  ${({hidden}: { hidden: boolean }) => hidden ? tw`hidden` : tw`block`}
`;

export default ActedOnPlayer;