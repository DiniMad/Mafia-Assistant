import React, {createContext, Dispatch, FC} from "react";
import {Gameplay, GameplayPlayer, Talk} from "../types/Gameplay";
import {CONFIG} from "../initial-configs";
import {useStorageReducer} from "react-storage-hooks";
import {initializeTalkQueueType} from "../types/TalkQueue";

initializeTalkQueueType();

type SetPlayersGameplayAction = {
    type: "SET_PLAYERS",
    payload: GameplayPlayer[]
}
type DisplayRolesGameplayAction = {
    type: "TOGGLE_DISPLAY_ROLES",
}
type RevealRoleGameplayAction = {
    type: "REVEAL_ROLE",
    payload: GameplayPlayer["id"]
}
type TogglePlayerActiveGameplayAction = {
    type: "TOGGLE_PLAYER_ACTIVE",
    payload: GameplayPlayer["id"]
}
type TalkQueueGameplayAction = {
    type: "SET_TALK_QUEUE",
    payload: Talk[]
} | {
    type: "TALK_FINISHED",
} | {
    type: "TALK_BEFORE" | "TALK_AFTER",
    payload: {
        playerId: GameplayPlayer["id"],
        talk: Talk
    }
}
type ChallengesBeenUsedGameplayAction = {
    type: "RESET_USED_CHALLENGES"
} | {
    type: "CHALLENGE_BEEN_USED",
    payload: GameplayPlayer["id"]
}
type ConfigTimeGameplayAction = {
    type: "SET_TALK_TIME" | "SET_CHALLENGE_TIME" | "SET_DEFENCE_TIME",
    payload: number
}
type GameplayAction =
    SetPlayersGameplayAction |
    DisplayRolesGameplayAction |
    RevealRoleGameplayAction |
    TogglePlayerActiveGameplayAction |
    TalkQueueGameplayAction |
    ChallengesBeenUsedGameplayAction|
    ConfigTimeGameplayAction;
const reducer = (state: Gameplay, action: GameplayAction) => {
    if (action.type === "SET_PLAYERS") {
        return {
            ...state,
            players: action.payload,
        };
    }

    if (action.type === "TOGGLE_DISPLAY_ROLES") {
        return {
            ...state,
            displayRoles: !state.displayRoles,
        };
    }

    if (action.type === "REVEAL_ROLE") {
        const players = state.players.map(player => {
            if (player.id === action.payload)
                return {
                    ...player,
                    role: {
                        ...player.role,
                        revealed: true,
                    },
                };
            return player;
        });

        return {
            ...state,
            players,
        };
    }

    if (action.type === "TOGGLE_PLAYER_ACTIVE") {
        const players = state.players.map(player => {
            if (player.id === action.payload)
                return {
                    ...player,
                    active: !player.active,
                };
            return player;
        });

        return {
            ...state,
            players,
        };
    }

    if (action.type === "SET_TALK_QUEUE") {
        return {
            ...state,
            talkQueue: action.payload,
        };
    }

    if (action.type === "TALK_FINISHED") {
        return {
            ...state,
            talkQueue: state.talkQueue.dequeue(),
        };
    }

    if (action.type === "TALK_BEFORE") {
        return {
            ...state,
            talkQueue: state.talkQueue.insertBefore(action.payload.talk, action.payload.playerId),
        };
    }

    if (action.type === "TALK_AFTER") {
        return {
            ...state,
            talkQueue: state.talkQueue.insertAfter(action.payload.talk, action.payload.playerId),
        };
    }

    if (action.type === "RESET_USED_CHALLENGES") {
        return {
            ...state,
            playerChallengesBeenUsed: [],
        };
    }

    if (action.type === "CHALLENGE_BEEN_USED") {
        return {
            ...state,
            playerChallengesBeenUsed: [
                ...state.playerChallengesBeenUsed,
                action.payload,
            ],
        };
    }
    
    if(action.type==="SET_TALK_TIME"){
        return {
            ...state,
            config:{
                ...state.config,
                talkTime:action.payload
            }
        }
    }
    
    if(action.type==="SET_CHALLENGE_TIME"){
        return {
            ...state,
            config:{
                ...state.config,
                challengeTime:action.payload
            }
        }
    }
    
    if(action.type==="SET_DEFENCE_TIME"){
        return {
            ...state,
            config:{
                ...state.config,
                defenseTime:action.payload
            }
        }
    }

    return state;
};

type GameplayContextType = [Gameplay, Dispatch<GameplayAction>]
export const GameplayContext = createContext<GameplayContextType>({} as GameplayContextType);
export const GameplayProvider: FC = ({children}) => {
    const initialState: Gameplay = {
        players: [],
        displayRoles: false,
        talkQueue: [],
        playerChallengesBeenUsed: [],
        config: CONFIG,
    };
    const [state, dispatch] = useStorageReducer(localStorage, "GAMEPLAY", reducer, initialState);

    return (
        <GameplayContext.Provider value={[state, dispatch]}>
            {children}
        </GameplayContext.Provider>
    );
};