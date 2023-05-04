import {createMachine, assign, send, actions, sendParent} from "xstate";
import {tickStateDefinition, resetTick, TickEvents, TickContext} from "@/stateMachines/common/tickStateDefinition";
import {GodfatherPlayer} from "@/types/godfatherGame";

export type DayTalkPlayer = {
    id: GodfatherPlayer["id"],
    name: string,
    hasSpoken: boolean,
    hasGivenOutChallenge: boolean,
    challengeQuantity: number
}

export type Context = TickContext & {
    talkingPlayer: GodfatherPlayer["id"],
    nextPlayerToTalk?: GodfatherPlayer["id"],
    challengerPlayer?: GodfatherPlayer["id"],
    players: DayTalkPlayer[],
    challengeAvailable: boolean,
}

type InitializeEvent = { type: "INITIALIZE", players: Pick<DayTalkPlayer, "id" | "name">[] }
type StartEvent = { type: "START" }
type NextEvent = { type: "NEXT" }
type ChallengeEvent = {
    type: "CHALLENGE_NOW" | "CHALLENGE_NEXT",
    playerId: DayTalkPlayer["id"]
}
export type Event = InitializeEvent | StartEvent | NextEvent | ChallengeEvent | TickEvents

export const dayTalkMachine = createMachine<Context, Event>(
    {
        predictableActionArguments: true,
        id: "dayTalk",
        initial: "uninitialized",
        context: {
            players: [],
            talkingPlayer: "",
            challengeAvailable: false,
            elapsedTime: 0,
        },
        states: {
            uninitialized: {
                on: {
                    INITIALIZE: {
                        actions: [
                            "assignPlayers",
                            "assignTalkingPlayer",
                        ],
                        target: "ready",
                    },
                },
            },
            ready: {
                on: {
                    START: {
                        target: "regular",
                    },
                },
            },
            regular: {
                entry: [
                    resetTick,
                    actions.choose([
                        {
                            cond: "talkingPlayerHasGivenOutChallenge",
                            actions: "setChallengeAvailableToFalse",
                        },
                        {
                            actions: "setChallengeAvailableToTrue",
                        },
                    ]),
                ],
                after: {
                    challengeTimeWindow: {
                        cond: "expireChallengeAutomatically",
                        actions: "setChallengeAvailableToFalse",
                    },
                    talkTime: [
                        {
                            cond: "goNextAutomatically",
                            actions: send("NEXT"),
                        },
                        {
                            actions: send("PAUSE"),
                        },
                    ],
                },
                on: {
                    NEXT: [
                        {
                            cond: "playerRemainToTalk",
                            actions: [
                                "setTalkingPlayerAsSpoken",
                                "setTalkingPlayerToNextUnspokenPlayerInOrder",
                            ],
                            target: "regular",
                        },
                        {
                            actions: "setTalkingPlayerAsSpoken",
                            target: "finish",
                        },
                    ],
                    CHALLENGE_NOW: {
                        cond: "challengeIsAvailable__challengerIsNotTalkingPlayer",
                        actions: [
                            "setTalkingPlayerHasChallengeGivenOutToTrue",
                            "setNextPlayerToTalkToTalkingPlayer",
                            "setTalkingPlayerToEventChallengerPlayer",
                        ],
                        target: "challenge",
                    },
                    CHALLENGE_NEXT: {
                        cond: "challengeIsAvailable__challengerIsNotTalkingPlayer",
                        actions: [
                            "setTalkingPlayerHasChallengeGivenOutToTrue",
                            "setChallengerPlayerToEventChallengerPlayer",
                        ],
                        target: "regularWithChallengeInQueue",
                    },
                },
                ...tickStateDefinition,
            },
            regularWithChallengeInQueue: {
                entry: [
                    resetTick,
                    actions.choose([
                        {
                            cond: "talkingPlayerHasGivenOutChallenge",
                            actions: "setChallengeAvailableToFalse",
                        },
                        {
                            actions: "setChallengeAvailableToTrue",
                        },
                    ]),
                ],
                after: {
                    talkTime: [
                        {
                            cond: "goNextAutomatically",
                            actions: send("NEXT"),
                        },
                        {
                            actions: send("PAUSE"),
                        },
                    ],
                },
                on: {
                    NEXT: [
                        {
                            actions: [
                                "setTalkingPlayerAsSpoken",
                                "setNextPlayerToTalkToNextUnspokenPlayerInOrder",
                                "setTalkingPlayerToChallengerPlayer",
                            ],
                            target: "challenge",
                        },
                    ],
                },
                ...tickStateDefinition,

            },
            challenge: {
                entry: [
                    resetTick,
                    "setChallengeAvailableToFalse",
                ],
                after: {
                    challengeTime: [
                        {
                            cond: "goNextAutomatically",
                            actions: send("NEXT"),
                        },
                        {
                            actions: send("PAUSE"),
                        },
                    ],
                },
                on: {
                    NEXT: [
                        {
                            cond: "playerRemainToTalk",
                            actions: [
                                "incrementTalkingPlayerChallengeQuantity",
                                "setTalkingPlayerToNextPlayerToTalk",
                            ],
                            target: "regular",
                        },
                        {
                            target: "finish",
                        },
                    ],
                },
                ...tickStateDefinition,
            },
            finish: {
                entry: [
                    "setTalkingPlayerToUndefined",
                    "setChallengeAvailableToFalse",
                ],
                on: {
                    NEXT: {
                        actions: "sendEndEventToParent",
                    },
                },
            },
        },
    },
    {
        guards: {
            playerRemainToTalk: (context) => {
                const nextPlayerToTalk =
                    context.players.find(p => p.id !== context.talkingPlayer && !p.hasSpoken);
                return Boolean(nextPlayerToTalk);
            },
            talkingPlayerHasGivenOutChallenge: (context) => {
                const talkingPlayer = context.players.find(p => p.id === context.talkingPlayer);
                if (talkingPlayer === undefined) throw Error();
                return talkingPlayer.hasGivenOutChallenge;
            },
            challengeIsAvailable__challengerIsNotTalkingPlayer: (context, event) => {
                if (event.type !== "CHALLENGE_NOW" && event.type !== "CHALLENGE_NEXT")
                    throw Error();

                return context.challengeAvailable && context.talkingPlayer !== event.playerId;
            },
            goNextAutomatically: () => true,
            expireChallengeAutomatically: () => false,
        },
        actions: {
            assignPlayers: assign({
                players: (_, event: InitializeEvent) => event.players.map(p => ({
                    ...p,
                    hasSpoken: false,
                    challengeQuantity: 0,
                    hasGivenOutChallenge: false,
                })),
            }),
            assignTalkingPlayer: assign({
                talkingPlayer: context => {
                    const randomIndex = Math.floor(Math.random() * context.players.length);
                    return context.players[randomIndex].id;
                },
            }),
            setTalkingPlayerToNextUnspokenPlayerInOrder: assign({
                talkingPlayer: context => {
                    const talkingPlayerIndex = context.players.findIndex(p => p.id === context.talkingPlayer);

                    for (let i = 1; i < context.players.length; i++) {
                        const nextPlayerIndex =
                            (talkingPlayerIndex + i) % context.players.length;
                        const nextPlayer = context.players[nextPlayerIndex];
                        if (!nextPlayer.hasSpoken) return nextPlayer.id;

                    }
                    throw Error("NO PLAYER REMAIN TO TALK");
                },
            }),
            setNextPlayerToTalkToNextUnspokenPlayerInOrder: assign({
                nextPlayerToTalk: context => {
                    const talkingPlayerIndex = context.players.findIndex(p => p.id === context.talkingPlayer);

                    for (let i = 1; i < context.players.length; i++) {
                        const nextPlayerIndex =
                            (talkingPlayerIndex + i) % context.players.length;
                        const nextPlayer = context.players[nextPlayerIndex];
                        if (!nextPlayer.hasSpoken) return nextPlayer.id;

                    }
                    throw Error("NO PLAYER REMAIN TO TALK");
                },
            }),
            setTalkingPlayerAsSpoken: assign({
                players: context => {
                    return context.players.map(p =>
                        p.id === context.talkingPlayer ? {...p, hasSpoken: true} : p,
                    );
                },
            }),
            setTalkingPlayerHasChallengeGivenOutToTrue: assign({
                players: context => {
                    return context.players.map(p =>
                        p.id === context.talkingPlayer ? {...p, hasGivenOutChallenge: true} : p,
                    );
                },
            }),
            setTalkingPlayerToChallengerPlayer: assign({
                talkingPlayer: (context) => {
                    if (context.challengerPlayer === undefined) throw Error();
                    return context.challengerPlayer;
                },
            }),
            setNextPlayerToTalkToTalkingPlayer: assign({
                nextPlayerToTalk: (context) => context.talkingPlayer,
            }),
            setTalkingPlayerToEventChallengerPlayer: assign({
                talkingPlayer: (_, event: ChallengeEvent) => event.playerId,
            }),
            setChallengerPlayerToEventChallengerPlayer: assign({
                challengerPlayer: (_, event: ChallengeEvent) => event.playerId,
            }),
            setTalkingPlayerToNextPlayerToTalk: assign({
                talkingPlayer: (context) => {
                    if (context.nextPlayerToTalk === undefined) throw Error();
                    return context.nextPlayerToTalk;
                },
            }),
            incrementTalkingPlayerChallengeQuantity: assign({
                players: (context) => {
                    return context.players.map(p => {
                        return p.id === context.talkingPlayer ? {...p, challengeQuantity: p.challengeQuantity + 1} : p;
                    });
                },
            }),
            setChallengeAvailableToTrue: assign({
                challengeAvailable: () => true,
            }),
            setChallengeAvailableToFalse: assign({
                challengeAvailable: () => false,
            }),
            setTalkingPlayerToUndefined: assign({
                talkingPlayer: () => undefined!,
            }),
            sendEndEventToParent: sendParent("DAY_TALK_END"),
        },
        delays: {
            challengeTimeWindow: 3000,
            talkTime: 5000,
            challengeTime: 5000,
        },
    });