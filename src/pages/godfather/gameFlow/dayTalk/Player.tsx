import React from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";
import {useTranslation} from "react-i18next";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    playerHasSpoken: boolean
    talkingPlayerId?: GodfatherPlayer["id"],
    talkTimeRemaining: number,
    challengeAvailable: boolean,
    requestChallengeNow: (challengerId: GodfatherPlayer["id"]) => void
    requestChallengeNext: (challengerId: GodfatherPlayer["id"]) => void
}
const Player = ({
                    playerId,
                    playerName,
                    playerHasSpoken,
                    talkingPlayerId,
                    talkTimeRemaining,
                    challengeAvailable,
                    requestChallengeNow,
                    requestChallengeNext,
                }: PlayerProps) => {
    const {t} = useTranslation();
    const talking = playerId === talkingPlayerId;

    const challengeNow = () => requestChallengeNow(playerId);
    const challengeNext = () => requestChallengeNext(playerId);

    return (
        <PlayerComponent spoken={playerHasSpoken} talking={talking}>
            <ChallengeNextButton hidden={talking}
                                 disabled={!challengeAvailable}
                                 onClick={challengeNext}>
                {t("challengeNext")}
            </ChallengeNextButton>
            <PlayerName>{playerName}</PlayerName>
            <ChallengeNowButton hidden={talking}
                                disabled={!challengeAvailable}
                                onClick={challengeNow}>
                {t("challengeBefore")}
            </ChallengeNowButton>
            <PlayerTalkRemainingTime hidden={!talking}>
                {talkTimeRemaining}
            </PlayerTalkRemainingTime>
        </PlayerComponent>
    );
};

const PlayerComponent = styled.div`
  ${tw`grid grid-cols-[1fr_4fr_1fr] justify-items-center items-center text-white h-10 m-1.5`}
  ${({spoken, talking}: { spoken: boolean, talking: boolean }) =>
          talking ? tw`bg-accent-300` :
                  spoken ? tw`bg-background-300 bg-opacity-50` :
                          tw`bg-background-300`}
`;

const PlayerName = tw.p`col-[1/4] row-[1/1] text-lg text-center`;

const ChallengeNextButton = tw.button`bg-background-200 disabled:bg-transparent disabled:text-neutral-500 col-[1/2] row-[1/1] text-xs h-8 w-8`;

const ChallengeNowButton = tw.button`bg-background-200 disabled:bg-transparent disabled:text-neutral-500 col-[3/4] row-[1/1] text-xs h-8 w-8`;

const PlayerTalkRemainingTime = tw.span`col-[3/4] row-[1/1] text-center w-8`;
export default Player;