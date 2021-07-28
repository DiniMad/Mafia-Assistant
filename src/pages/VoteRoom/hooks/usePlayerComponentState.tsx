import React from "react";
import {GameplayPlayer} from "../../../types/Gameplay";

const generateComponentClasses = ({active, shouldTalk}: Pick<Props, "active" | "shouldTalk">) => {
    if (!active) return "de-active";
    if (shouldTalk) return "should-talk";
    return undefined;
};
const generateSideActionText = ({active, shouldTalk, talkTime, minimumVoteRequire}: Props) => {
    if (!active) return "";
    if (shouldTalk) return talkTime.toString();
    return minimumVoteRequire.toString();
};
const generateSideActionClasses = ({active, shouldDefence}: Pick<Props, "active" | "shouldDefence">) => {
    if (!active) return "de-active";
    if (shouldDefence) return "should-defence";
    return undefined;
};

type Props = Pick<GameplayPlayer, "active"> & {
    shouldDefence: boolean,
    shouldTalk: boolean,
    talkTime: number,
    minimumVoteRequire: number,
}
const usePlayerComponentState = (props: Props) => {
    const componentClasses = generateComponentClasses({...props});
    const sideActionText = generateSideActionText({...props});
    const sideActionClasses = generateSideActionClasses({...props});

    return {
        componentClasses,
        sideActionText,
        sideActionClasses,
    };
};

export default usePlayerComponentState;