import React from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    selected: boolean,
    select: (playedId: GodfatherPlayer["id"]) => void
}
const Player = ({playerId, playerName, selected, select}: PlayerProps) => {
    const selectThePlayer = () => select(playerId);

    return (
        <PlayerComponent selected={selected} onClick={selectThePlayer}>
            <PlayerName>{playerName}</PlayerName>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.button`
  ${tw`flex justify-center items-center text-white h-10 m-1.5`}
  ${({selected}: { selected: boolean }) => selected ? tw`bg-accent-300` : tw`bg-background-300`}
`;

const PlayerName = tw.p`text-lg text-center`;

export default Player;