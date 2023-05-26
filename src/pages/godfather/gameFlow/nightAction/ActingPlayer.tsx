import React, {MouseEvent, TouchEvent, useRef, useState} from "react";
import {GodfatherPlayer} from "@/types/godfatherGame";
import tw, {styled} from "twin.macro";

type PlayerProps = {
    playerId: GodfatherPlayer["id"],
    playerName: string,
    active: boolean,
    select: (playedId: GodfatherPlayer["id"]) => void
}
const ActingPlayer = ({playerId, playerName, active, select}: PlayerProps) => {
    const LONG_PRESS_DURATION = 1500;
    const timerRef = useRef<NodeJS.Timeout>();
    const [longPressing, setLongPressing] = useState(false);

    const startLongPress = (e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
        if (e.currentTarget.disabled) return;

        setLongPressing(true);
        timerRef.current = setTimeout(selectThePlayer, LONG_PRESS_DURATION);
    };
    const endLongPress = () => {
        clearTimeout(timerRef.current);
        setLongPressing(false);
    };

    const selectThePlayer = () => select(playerId);

    return (
        <PlayerComponent disabled={!active}
                         onMouseDown={startLongPress}
                         onTouchStart={startLongPress}
                         onMouseUp={endLongPress}
                         onTouchEnd={endLongPress}>
            <PlayerLongPressEffect longPressing={longPressing} transitionDuration={LONG_PRESS_DURATION}/>
            <PlayerName>{playerName}</PlayerName>
        </PlayerComponent>
    );
};

const PlayerComponent = tw.button`bg-accent-300 disabled:bg-background-300  grid items-center disabled:bg-opacity-70 text-white h-10 m-1.5`;

const PlayerLongPressEffect = styled.div((
    {longPressing, transitionDuration}: { longPressing: boolean, transitionDuration: number }) => [
    tw`bg-accent-400 row-[1/1] col-[1/1] justify-self-center w-full h-full transition-transform duration-[1.5s] ease-out`,
    `transition-duration: ${transitionDuration}ms;`,
    longPressing ? tw`scale-x-100` : tw`scale-x-0`,
]);

const PlayerName = tw.p`row-[1/1] col-[1/1] z-[1] text-lg text-center select-none`;

export default ActingPlayer;