﻿import {assign, createMachine, send, sendParent} from "xstate";
import {
    GodfatherPlayer,
    NightAction,
    NostradamusAct,
    guards,
    GodfatherAct,
    SaulAct,
    MatadorAct, WatsonAct, LeonAct, KaneAct, ConstantinAct,
} from "@/types/godfatherGame";
import {pure} from "xstate/lib/actions";

type AnnouncementGuid = {
    titleKey: `role-${GodfatherPlayer["roleKey"]}` | "fakeAct",
    textKey: `act-guid-${Uppercase<GodfatherPlayer["roleKey"]> | "FAKE_ACT"}`,
    propKey?: any,
}
type AnnouncementChoice = {
        textKey: `act-choice-${Uppercase<Extract<GodfatherPlayer["roleKey"], "nostradamus">>}`
        choices: readonly ["Mafia"] | readonly ["Mafia", "Citizen"]
    }
    | {
    textKey: `act-choice-${Uppercase<Extract<GodfatherPlayer["roleKey"], "godfather">>}`
    choices: ["shot", "6sense"?, "suggestion"?]
}
type Suggestion = {
    byWhom: GodfatherPlayer,
    whomWhoSuggested: GodfatherPlayer,
    suggestedAct: "buy"
}
type ActedOnPlayer = GodfatherPlayer & {
    active: boolean,
    selected: boolean,
    revealRole: boolean,
};
type ActingPlayer = GodfatherPlayer & {
    countOfCommittedAct: number,
    canAct: boolean,
};
export type Context = {
    actedOnPlayers: ActedOnPlayer[]
    actingPlayers: ActingPlayer[]
    nightActions: NightAction[],
    suggestion?: Suggestion,
    announcement?: AnnouncementGuid | AnnouncementChoice,
    actingPlayer?: GodfatherPlayer,
    config: {
        doctorSaveQuantity: number,
        nostradamusChoiceQuantity: number;
        mafiaChoices: ["shot", "6sense"?, "suggestion"?],
        countOfActs: 1 | 2
    }
}

type InitializeEvent = { type: "INITIALIZE", actedOnPlayers: GodfatherPlayer[], actingPlayers: GodfatherPlayer[] };
type NostradamusActEvent = { type: "NOSTRADAMUS_ACT" };
type GodfatherActEvent = { type: "GODFATHER_ACT" };
type SaulActEvent = { type: "SAUL_ACT" };
type MatadorActEvent = { type: "MATADOR_ACT" };
type MafiaActEvent = { type: "MAFIA_ACT" };
type WatsonActEvent = { type: "WATSON_ACT" };
type LeonActEvent = { type: "LEON_ACT" };
type KaneActEvent = { type: "KANE_ACT" };
type ConstantineActEvent = { type: "CONSTANTINE_ACT" };
type CitizenActEvent = { type: "CITIZEN_ACT" };
type SelectPlayerEvent = { type: "SELECT_PLAYER", player: GodfatherPlayer["id"] };
type ChosenMultiAnswerEvent = { type: "CHOSEN_MULTI_ANSWER", choiceIndex: number };
type AcceptSuggestionEvent = { type: "ACCEPT_SUGGESTION" };
type RejectSuggestionEvent = { type: "REJECT_SUGGESTION" };
type NextEvent = { type: "NEXT" };
export type Event =
    InitializeEvent |
    NostradamusActEvent |
    GodfatherActEvent |
    SaulActEvent |
    MatadorActEvent |
    MafiaActEvent |
    WatsonActEvent |
    LeonActEvent |
    KaneActEvent |
    ConstantineActEvent |
    CitizenActEvent |
    SelectPlayerEvent |
    ChosenMultiAnswerEvent |
    AcceptSuggestionEvent |
    RejectSuggestionEvent |
    NextEvent;

export const nightActionMachine = createMachine<Context, Event>({
    predictableActionArguments: true,
    id: "nightAction",
    initial: "uninitialized",
    context: {
        actedOnPlayers: [],
        actingPlayers: [],
        nightActions: [],
        config: {
            doctorSaveQuantity: 2,
            nostradamusChoiceQuantity: 3,
            mafiaChoices: ["shot", "6sense", "suggestion"],
            countOfActs: 2,
        },
    },
    states: {
        uninitialized: {
            on: {
                INITIALIZE: {
                    actions: "assignPlayers",
                    target: "queue",
                },
            },
        },
        queue: {
            entry: [
                "setActedOnPlayersSelectedPropertyToFalse",
                "setAllPlayersActiveToTrue",
                "setAllPlayersRevealRoleToFalse",
            ],
            after: {
                100: {
                    cond: "isAutomaticActing",
                    actions: "sendSelectPlayerEventForNextPlayerInQueueOrder",
                },
            },
            on: {
                SELECT_PLAYER: {
                    cond: "selectedPlayerCanAct",
                    actions: [
                        "assignActingPlayerToSelectedPlayer",
                        "assignSelectedPlayerCountOfCommittedActAndCanAct",
                        "sendAssociateActWithThePlayerActing",
                    ],
                },
                NEXT: {
                    cond: "allPlayersDoneTheirAct",
                    actions: "sendEndEventToParent",
                },
                NOSTRADAMUS_ACT: [
                    {
                        cond: "nostradamusActExistInActions",
                        target: "fakeAct",
                    },
                    "nostradamusAct",
                ],
                GODFATHER_ACT: [
                    {
                        cond: "godfatherActExistInActions",
                        target: "fakeAct",
                    },
                    {
                        cond: "saulActExistInActions",
                        target: "fakeAct",
                    },
                    "godfatherAct",
                ],
                SAUL_ACT: [
                    {
                        cond: "godfatherActExistInActions",
                        target: "fakeAct",
                    },
                    {
                        cond: "saulActExistInActions",
                        target: "fakeAct",
                    },
                    "saulAct",
                ],
                MATADOR_ACT: [
                    {
                        cond: "matadorActExistInActions",
                        target: "fakeAct",
                    },
                    "matadorAct",
                ],
                MAFIA_ACT: "fakeAct",
                WATSON_ACT: [
                    {
                        cond: "watsonActExistInActions",
                        target: "fakeAct",
                    },
                    "watsonAct",
                ],
                LEON_ACT: [
                    {
                        cond: "leonActExistInActions",
                        target: "fakeAct",
                    },
                    "leonAct",
                ],
                KANE_ACT: [
                    {
                        cond: "kaneActExistInActions",
                        target: "fakeAct",
                    },
                    "kaneAct",
                ],
                CONSTANTINE_ACT: [
                    {
                        cond: "constantineActExistInActions",
                        target: "fakeAct",
                    },
                    "constantineAct",
                ],
                CITIZEN_ACT: "fakeAct",
            },
        },
        nostradamusAct: {
            entry: "setActingPlayerActiveToFalse",
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToNostradamusGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "nostradamusActRequiredAmountOfPlayersAreNotSelected",
                            },
                            {
                                actions: "assignNostradamusActToNightActions",
                                target: "chooseSide",
                            },
                        ],
                    },
                },
                chooseSide: {
                    entry: "assignAnnouncementToNostradamusChoice",
                    on: {
                        CHOSEN_MULTI_ANSWER: {
                            actions: "assignChosenAnswerToNostradamusAct",
                            target: "#nightAction.queue",
                        },
                    },
                    exit: "assignAnnouncementToUndefined",
                },
            },
        },
        godfatherAct: {
            entry: [
                "setMafiaPlayersRevealRoleToTrue",
                "setMafiaPlayersActiveToFalse",
            ],
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToGodfatherGuid",
                    on: {
                        NEXT: [
                            {
                                cond: "saulSuggestedPlayerToBuy",
                                target: "saulSuggestion",
                            },
                            "playerSelection",
                        ],
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                saulSuggestion: {
                    on: {
                        ACCEPT_SUGGESTION: {
                            actions: "assignSaulActToNightActions",
                            target: "#nightAction.queue",
                        },
                        REJECT_SUGGESTION: "playerSelection",
                    },
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                cond: "selectedPlayerIsOnMafiaSide",
                            },
                            "choosingAction",
                        ],
                    },
                },
                choosingAction: {
                    entry: "assignAnnouncementToGodfatherChoice",
                    on: {
                        CHOSEN_MULTI_ANSWER: [
                            {
                                cond: "godfatherChosenShot",
                                actions: "assignGodfatherShotActToNightActions",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "godfatherChosen6Sense",
                                actions: "assignGodfather6SenseActToNightActions",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "godfatherChosenBuySuggestion",
                                actions: "assignBuySuggestion",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                    exit: "assignAnnouncementToUndefined",
                },
            },
        },
        saulAct: {
            entry: [
                "setMafiaPlayersRevealRoleToTrue",
                "setMafiaPlayersActiveToFalse",
            ],
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToSaulGuid",
                    on: {
                        NEXT: [
                            {
                                cond: "godfatherSuggestedPlayerToBuy",
                                target: "godfatherSuggestion",
                            },
                            {
                                cond: "suggestionExistInMafiaChoices",
                                target: "playerSelection",
                            },
                            {
                                actions: "setAllPlayersActiveToFalse",
                                target: "playerSelection",
                            },
                        ],
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                godfatherSuggestion: {
                    on: {
                        ACCEPT_SUGGESTION: {
                            actions: "assignSaulActToNightActions",
                            target: "#nightAction.queue",
                        },
                        REJECT_SUGGESTION: "playerSelection",
                    },
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                cond: "selectedPlayerIsOnMafiaSide",
                            },
                            {
                                actions: "assignSaulActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        matadorAct: {
            entry: [
                "setMafiaPlayersRevealRoleToTrue",
                "setMafiaPlayersActiveToFalse",
            ],
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToMatadorGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                cond: "selectedPlayerIsOnMafiaSide",
                            },
                            {
                                actions: "assignMatadorActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        watsonAct: {
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToWatsonGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "watsonActRequiredAmountOfPlayersAreNotSelected",
                            },
                            {
                                actions: "assignWatsonActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        leonAct: {
            entry: "setActingPlayerActiveToFalse",
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToLeonGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                actions: "assignLeonActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        kaneAct: {
            entry: "setActingPlayerActiveToFalse",
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToKaneGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                actions: "assignKaneActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        constantineAct: {
            entry: [
                "setActingPlayerActiveToFalse",
                "setUneliminatedPlayerActiveToFalse",
            ],
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToConstantinGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "noPlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                            {
                                cond: "moreOrLessThanOnePlayerSelected",
                            },
                            {
                                actions: "assignConstantineActToNightActions",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
        fakeAct: {
            entry: "setAllExpectOneRandomPlayerActiveToFalse",
            initial: "guid",
            states: {
                guid: {
                    entry: "assignAnnouncementToFakeActGuid",
                    on: {
                        NEXT: "playerSelection",
                    },
                    exit: "assignAnnouncementToUndefined",
                },
                playerSelection: {
                    on: {
                        SELECT_PLAYER: {
                            cond: "eventSelectedPlayerIsActive",
                            actions: "toggleEventPlayerSelected",
                        },
                        NEXT: [
                            {
                                cond: "activePlayerIsSelected",
                                target: "#nightAction.queue",
                            },
                        ],
                    },
                },
            },
        },
    },
}, {
    guards: {
        isAutomaticActing: () => false,
        nostradamusActExistInActions: ctx =>
            ctx.nightActions.find(guards.isNostradamusAct) !== undefined,
        godfatherActExistInActions: ctx =>
            ctx.nightActions.find(guards.isGodfatherAct) !== undefined,
        saulActExistInActions: ctx =>
            ctx.nightActions.find(guards.isSaulAct) !== undefined,
        matadorActExistInActions: ctx =>
            ctx.nightActions.find(guards.isMatadorAct) !== undefined,
        watsonActExistInActions: ctx =>
            ctx.nightActions.find(guards.isWatsonAct) !== undefined,
        leonActExistInActions: ctx =>
            ctx.nightActions.find(guards.isLeonAct) !== undefined,
        kaneActExistInActions: ctx =>
            ctx.nightActions.find(guards.isKaneAct) !== undefined,
        constantineActExistInActions: ctx =>
            ctx.nightActions.find(guards.isConstantinAct) !== undefined,
        saulSuggestedPlayerToBuy: ctx =>
            ctx.suggestion?.byWhom.roleKey === "saul",
        godfatherSuggestedPlayerToBuy: ctx =>
            ctx.suggestion?.byWhom.roleKey === "godfather",
        suggestionExistInMafiaChoices: ctx =>
            ctx.config.mafiaChoices.includes("suggestion"),
        eventSelectedPlayerIsActive: (ctx, e) => {
            if (e.type !== "SELECT_PLAYER") throw Error();

            const player =
                ctx.actedOnPlayers.find(p => p.id === e.player);
            if (player === undefined) throw Error();

            return player.active;
        },
        nostradamusActRequiredAmountOfPlayersAreNotSelected: ctx => {
            const selectedPlayers = ctx.actedOnPlayers.filter(p => p.selected);
            return selectedPlayers.length !== ctx.config.nostradamusChoiceQuantity;
        },
        watsonActRequiredAmountOfPlayersAreNotSelected: ctx => {
            const selectedPlayers = ctx.actedOnPlayers.filter(p => p.selected);
            return selectedPlayers.length !== ctx.config.doctorSaveQuantity;
        },
        moreOrLessThanOnePlayerSelected: ctx => {
            const selectedPlayers = ctx.actedOnPlayers.filter(p => p.selected);
            return selectedPlayers.length !== 1;
        },
        activePlayerIsSelected: ctx => {
            const activePlayers =
                ctx.actedOnPlayers.filter(p => p.active);
            return activePlayers.every(p => p.selected);
        },
        selectedPlayerIsOnMafiaSide: ctx => {
            const selectedPlayer = ctx.actedOnPlayers.find(p => p.selected);
            if (selectedPlayer === undefined) throw Error();

            return selectedPlayer.roleSide === "Mafia";
        },
        noPlayerIsSelected: ctx => {
            const selectedPlayers = ctx.actedOnPlayers.filter(p => p.selected);
            return selectedPlayers.length === 0;
        },
        allPlayersDoneTheirAct: ctx => {
            const player =
                ctx.actingPlayers.find(p => p.canAct);
            return player === undefined;
        },
        selectedPlayerCanAct: (ctx, e) => {
            if (e.type !== "SELECT_PLAYER") throw Error();
            const player =
                ctx.actingPlayers.find(p => p.id === e.player);
            if (player === undefined) throw Error();

            return player.canAct;
        },
        godfatherChosenShot: (_, e) => {
            if (e.type !== "CHOSEN_MULTI_ANSWER") throw Error();
            return e.choiceIndex === 0;
        },
        godfatherChosen6Sense: (_, e) => {
            if (e.type !== "CHOSEN_MULTI_ANSWER") throw Error();
            return e.choiceIndex === 1;
        },
        godfatherChosenBuySuggestion: (_, e) => {
            if (e.type !== "CHOSEN_MULTI_ANSWER") throw Error();
            return e.choiceIndex === 2;
        },
    },
    actions: {
        assignPlayers: assign({
            actedOnPlayers: (ctx, e: InitializeEvent) =>
                e.actedOnPlayers.map<ActedOnPlayer>(p => ({
                    ...p,
                    active: true,
                    selected: false,
                    revealRole: false,
                })),
            actingPlayers: (ctx, e: InitializeEvent) => e.actedOnPlayers.map<ActingPlayer>(p => ({
                ...p,
                countOfCommittedAct: 0,
                canAct: true,
            })),
        }),
        setActedOnPlayersSelectedPropertyToFalse: assign({
            actedOnPlayers: ctx => ctx.actedOnPlayers.map(p => ({...p, selected: false})),
        }),
        assignActingPlayerToSelectedPlayer: assign({
            actingPlayer: (ctx, e: SelectPlayerEvent) => {
                const player =
                    ctx.actingPlayers.find(p => p.id === e.player);
                if (player === undefined) throw Error();

                return player;
            },
        }),
        assignSelectedPlayerCountOfCommittedActAndCanAct: assign({
            actingPlayers: (ctx, e: SelectPlayerEvent) => {
                return ctx.actingPlayers.map(p => p.id === e.player ? {
                    ...p,
                    countOfCommittedAct: p.countOfCommittedAct + 1,
                    canAct: ctx.config.countOfActs > p.countOfCommittedAct + 1,
                } : p);
            },
        }),
        sendSelectPlayerEventForNextPlayerInQueueOrder: pure((ctx, e: SelectPlayerEvent) => {
            const player =
                ctx.actingPlayers
                    .sort((p1, p2) =>
                        p1.countOfCommittedAct - p2.countOfCommittedAct)
                    .find(p => p.canAct);
            if (player === undefined) return;

            return send({type: "SELECT_PLAYER", player: player.id});
        }),
        sendAssociateActWithThePlayerActing: pure((ctx, e: SelectPlayerEvent) => {
            const player =
                ctx.actingPlayers.find(p => p.id === e.player);
            if (player === undefined) throw Error();

            const eventType = roleToActEventMapper(player.roleKey);
            return send({type: eventType});
        }),
        setMafiaPlayersRevealRoleToTrue: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    p.roleSide === "Mafia" ? {...p, revealRole: true} : p);
            },
        }),
        setAllPlayersRevealRoleToFalse: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    ({...p, revealRole: false}));
            },
        }),
        setActingPlayerActiveToFalse: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    p.id === ctx.actingPlayer?.id ? {...p, active: false} : p);
            },
        }),
        setUneliminatedPlayerActiveToFalse: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    !p.eliminated ? {...p, active: false} : p);
            },
        }),
        setMafiaPlayersActiveToFalse: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    p.roleSide === "Mafia" ? {...p, active: false} : p);
            },
        }),
        setAllPlayersActiveToTrue: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    ({...p, active: true}));
            },
        }),
        setAllPlayersActiveToFalse: assign({
            actedOnPlayers: ctx => {
                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    ({...p, active: false}));
            },
        }),
        setAllExpectOneRandomPlayerActiveToFalse: assign({
            actedOnPlayers: ctx => {
                const randomIndex =
                    Math.floor(Math.random() * ctx.actedOnPlayers.length);
                const randomPlayer = ctx.actedOnPlayers[randomIndex];

                return ctx.actedOnPlayers.map<ActedOnPlayer>(p =>
                    (p.id === randomPlayer.id ?
                        {...p, active: true} :
                        {...p, active: false}));
            },
        }),
        toggleEventPlayerSelected: assign({
            actedOnPlayers: (ctx, e: SelectPlayerEvent) => {
                return ctx.actedOnPlayers.map(p => p.id === e.player ? {...p, selected: !p.selected} : p);
            },
        }),
        assignAnnouncementToNostradamusGuid: assign({
            announcement: ctx => ({
                titleKey: "role-nostradamus",
                textKey: "act-guid-NOSTRADAMUS",
                propKey: ctx.config.nostradamusChoiceQuantity,
            }),
        }),
        assignAnnouncementToGodfatherGuid: assign({
            announcement: () => ({
                titleKey: "role-godfather",
                textKey: "act-guid-GODFATHER",
            }),
        }),
        assignAnnouncementToSaulGuid: assign({
            announcement: () => ({
                titleKey: "role-saul",
                textKey: "act-guid-SAUL",
            }),
        }),
        assignAnnouncementToMatadorGuid: assign({
            announcement: () => ({
                titleKey: "role-matador",
                textKey: "act-guid-MATADOR",
            }),
        }),
        assignAnnouncementToWatsonGuid: assign({
            announcement: ctx => ({
                titleKey: "role-watson",
                textKey: "act-guid-WATSON",
                propKey: ctx.config.doctorSaveQuantity,
            }),
        }),
        assignAnnouncementToLeonGuid: assign({
            announcement: () => ({
                titleKey: "role-leon",
                textKey: "act-guid-LEON",
            }),
        }),
        assignAnnouncementToKaneGuid: assign({
            announcement: () => ({
                titleKey: "role-kane",
                textKey: "act-guid-KANE",
            }),
        }),
        assignAnnouncementToConstantinGuid: assign({
            announcement: () => ({
                titleKey: "role-constantine",
                textKey: "act-guid-CONSTANTINE",
            }),
        }),
        assignAnnouncementToFakeActGuid: assign({
            announcement: () => ({
                titleKey: "fakeAct",
                textKey: "act-guid-FAKE_ACT",
            }),
        }),
        assignAnnouncementToNostradamusChoice: assign({
            announcement: (ctx) => {
                const act =
                    ctx.nightActions.find(guards.isNostradamusAct);
                if (act === undefined) throw Error();

                return {
                    textKey: "act-choice-NOSTRADAMUS",
                    choices: act.sideChoices,
                };
            },
        }),
        assignAnnouncementToGodfatherChoice: assign({
            announcement: ctx => ({
                textKey: "act-choice-GODFATHER",
                choices: ctx.config.mafiaChoices,
            }),
        }),
        assignAnnouncementToUndefined: assign({
            announcement: () => undefined,
        }),
        assignNostradamusActToNightActions: assign({
            nightActions: ctx => {
                const choices =
                    ctx.actedOnPlayers.filter(p => p.selected);
                const numberOfMafiasExceptGodfather =
                    choices.filter(p =>
                        p.roleSide === "Mafia" && p.roleKey !== "godfather").length;
                const sideChoices =
                    numberOfMafiasExceptGodfather > 1 ?
                        ["Mafia"] as const :
                        ["Mafia", "Citizen"] as const;

                const act: NostradamusAct = {
                    action: "NOSTRADAMUS",
                    choices,
                    numberOfMafiasExceptGodfather,
                    sideChoices,
                };

                return [...ctx.nightActions, act];
            },
        }),
        assignChosenAnswerToNostradamusAct: assign({
            nightActions: (ctx, e: ChosenMultiAnswerEvent) => {
                const nostradamusAct =
                    ctx.nightActions.find(guards.isNostradamusAct);
                if (nostradamusAct === undefined) throw Error();

                nostradamusAct.sideChoice = nostradamusAct.sideChoices[e.choiceIndex];

                const restOfActs =
                    ctx.nightActions.filter(a => !guards.isNostradamusAct(a));

                return [...restOfActs, nostradamusAct];
            },
        }),
        assignGodfatherShotActToNightActions: assign({
            nightActions: ctx => {
                const player =
                    ctx.actedOnPlayers.find(p => p.selected);
                if (player === undefined) throw Error();

                const act: GodfatherAct =
                    {action: "GODFATHER", choice: "shot", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignGodfather6SenseActToNightActions: assign({
            nightActions: ctx => {
                const player =
                    ctx.actedOnPlayers.find(p => p.selected);
                if (player === undefined) throw Error();

                const act: GodfatherAct =
                    {action: "GODFATHER", choice: "6sense", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignBuySuggestion: assign({}),
        assignSaulActToNightActions: assign({
            nightActions: ctx => {
                const player =
                    ctx.actedOnPlayers.find(p => p.selected);
                if (player === undefined) throw Error();

                const act: SaulAct = {action: "SAUL", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignMatadorActToNightActions: assign({
            nightActions: ctx => {
                const player =
                    ctx.actedOnPlayers.find(p => p.selected);
                if (player === undefined) throw Error();

                const act: MatadorAct = {action: "MATADOR", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignWatsonActToNightActions: assign({
            nightActions: ctx => {
                const players = ctx.actedOnPlayers
                    .filter(p => p.selected)
                    .map(p => p.id);
                if (players.length < 1) throw Error();

                const act: WatsonAct = {action: "WATSON", players};

                return [...ctx.nightActions, act];
            },
        }),
        assignLeonActToNightActions: assign({
            nightActions: ctx => {
                const player = ctx.actedOnPlayers
                    .find(p => p.selected);
                if (player === undefined) throw Error();

                const act: LeonAct = {action: "LEON", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignKaneActToNightActions: assign({
            nightActions: ctx => {
                const player = ctx.actedOnPlayers
                    .find(p => p.selected);
                if (player === undefined) throw Error();

                const act: KaneAct = {action: "KANE", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        assignConstantineActToNightActions: assign({
            nightActions: ctx => {
                const player = ctx.actedOnPlayers
                    .find(p => p.selected);
                if (player === undefined) throw Error();

                const act: ConstantinAct = {action: "CONSTANTIN", player: player.id};

                return [...ctx.nightActions, act];
            },
        }),
        sendEndEventToParent: sendParent(ctx => ({type: "NIGHT_ACTION_END", nightActions: ctx.nightActions})),
    },
});

type RoleActEvent = Extract<Event["type"], `${Uppercase<GodfatherPlayer["roleKey"]>}_ACT`>
const roleToActEventMapper = (role: GodfatherPlayer["roleKey"]): RoleActEvent => {
    switch (role) {
        case "godfather":
            return "GODFATHER_ACT";
        case "saul":
            return "SAUL_ACT";
        case "matador":
            return "MATADOR_ACT";
        case "mafia":
            return "MAFIA_ACT";
        case "nostradamus":
            return "NOSTRADAMUS_ACT";
        case "watson":
            return "WATSON_ACT";
        case "leon":
            return "LEON_ACT";
        case "kane":
            return "KANE_ACT";
        case "constantine":
            return "CONSTANTINE_ACT";
        case "citizen":
            return "CITIZEN_ACT";
    }
};