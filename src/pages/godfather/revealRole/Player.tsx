import React, {useRef, useState, MouseEvent, TouchEvent} from "react";
import tw, {styled} from "twin.macro";
import Modal from "@components/Modal";
import RoleCard from "@/pages/godfather/RoleCard";
import {GodfatherPlayer} from "@/types/godfatherGame";
import {useAppDispatch} from "@/store";
import {revealPlayerRole} from "@/store/godfatherGame";

type PlayerProps = {
    player: GodfatherPlayer
}
const Player = ({player: {id, name, roleKey, roleSide, roleRevealed}}: PlayerProps) => {
    const LONG_PRESS_DURATION = 1500;
    const timerRef = useRef<NodeJS.Timeout>();
    const [longPressing, setLongPressing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const startLongPress = (e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
        if (e.currentTarget.disabled) return;
        
        setLongPressing(true);
        timerRef.current = setTimeout(revealRole, LONG_PRESS_DURATION);
    };
    const endLongPress = () => {
        clearTimeout(timerRef.current);
        setLongPressing(false);
    };

    const revealRole = () => {
        setShowModal(true);
        dispatch(revealPlayerRole({playerId: id}));
    };
    const closeModal = () => setShowModal(false);

    return (
        <>
            <PlayerButton disabled={roleRevealed}
                          onMouseDown={startLongPress}
                          onTouchStart={startLongPress}
                          onMouseUp={endLongPress}
                          onTouchEnd={endLongPress}>
                <PlayerLongPressEffect longPressing={longPressing} transitionDuration={LONG_PRESS_DURATION}/>
                <PlayerName>{name}</PlayerName>
            </PlayerButton>
            <Modal show={showModal}>
                <RoleCard roleKey={roleKey} side={roleSide} onDoneButtonClicked={closeModal}/>
            </Modal>
        </>
    );
};

const PlayerButton = tw.button`bg-accent-300 disabled:bg-background-300 disabled:bg-opacity-70 grid items-center min-h-10 text-white text-lg select-none m-1.5`;

const PlayerLongPressEffect = styled.div((
    {longPressing, transitionDuration}: { longPressing: boolean, transitionDuration: number }) => [
    tw`bg-accent-400 row-[1/1] col-[1/1] justify-self-center w-full h-full transition-transform duration-[1.5s] ease-out`,
    `transition-duration: ${transitionDuration}ms;`,
    longPressing ? tw`scale-x-100` : tw`scale-x-0`,
]);

const PlayerName = tw.span`row-[1/1] col-[1/1] z-[1]`;

export default Player;