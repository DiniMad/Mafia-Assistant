import {useCallback, useRef, useState, MouseEvent, TouchEvent} from "react";

type Props = {
    delay: number,
    onClick: () => void,
    onLongPress: () => void,
}
const useLongPress = ({delay = 300, onClick, onLongPress}: Props) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    const start = useCallback(() => {
        timeout.current = setTimeout(() => {
            onLongPress();
            setLongPressTriggered(true);
        }, delay);
    }, [onLongPress, delay]);

    const clear = useCallback((e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLElement>) => {
        e.preventDefault();
        !longPressTriggered && onClick();
        setLongPressTriggered(false);
        
        if(!timeout.current) return
         clearTimeout(timeout.current);
    }, [onClick, longPressTriggered]);

    return {
        onMouseDown: () => start(),
        onTouchStart: () => start(),
        onMouseUp: (e: MouseEvent<HTMLButtonElement>) => clear(e),
        onMouseLeave: (e: MouseEvent<HTMLButtonElement>) => clear(e),
        onTouchEnd: (e: TouchEvent<HTMLElement>) => clear(e),
    };
};

export default useLongPress;