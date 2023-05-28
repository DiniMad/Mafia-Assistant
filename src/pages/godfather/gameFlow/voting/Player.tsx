import React from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";
import {useTranslation} from "react-i18next";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    hasTheVote: boolean,
    minimumRequiredCount: number,
    toggleHasTheVote: (playedId: GodfatherPlayer["id"]) => void
}
const Player = ({playerId, playerName, hasTheVote, minimumRequiredCount, toggleHasTheVote}: PlayerProps) => {
    const {t} = useTranslation();

    const toggle = () => toggleHasTheVote(playerId);

    return (
        <PlayerComponent>
            <PlayerName>{playerName}</PlayerName>
            <DefenceTalkButton hasTheVote={hasTheVote} onClick={toggle}>
                {minimumRequiredCount}
            </DefenceTalkButton>
        </PlayerComponent>
    );
};

const PlayerComponent = tw.div`bg-background-300 grid grid-cols-[5fr_1fr] justify-items-center items-center text-white min-h-10 m-1.5`;

const PlayerName = tw.p`col-[1/3] row-[1/1] text-lg text-center`;

const DefenceTalkButton = styled.button`
  ${tw`col-[2/3] row-[1/1] text-xs h-8 w-8`}
  ${({hasTheVote}: { hasTheVote: boolean }) => hasTheVote ? tw`bg-accent-300` : tw`bg-background-200`}
`;
export default Player;