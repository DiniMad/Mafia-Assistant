import {assign, createMachine, sendParent} from "xstate";
import {GodfatherPlayer} from "@/types/godfatherGame";

type VotingPlayer = {
    id: GodfatherPlayer["id"],
    name: string,
    hasTheVote: boolean
}

export type Context = {
    players: VotingPlayer[],
}

type InitializeEvent = { type: "INITIALIZE", players: GodfatherPlayer[] };
type ToggleVoteEvent = { type: "TOGGLE_VOTE", playerId: VotingPlayer["id"] };
type NextEvent = { type: "NEXT" };
export type Event = InitializeEvent | ToggleVoteEvent | NextEvent;
export const votingMachine = createMachine<Context, Event>(
    {
        predictableActionArguments: true,
        id: "voting",
        initial: "uninitialized",
        context: {
            players: [],
        },
        states: {
            uninitialized: {
                on: {
                    INITIALIZE: {
                        actions: "assignPlayers",
                        target: "voting",
                    },
                },
            },
            voting: {
                on: {
                    TOGGLE_VOTE: {
                        actions: "toggleHasTheVote",
                    },
                    NEXT: {
                        actions: "sendEndEventToParent",
                    },
                },
            },
        },
    },
    {
        actions: {
            assignPlayers: assign({
                players: (_, e: InitializeEvent) => e.players.map(p => ({
                    ...p,
                    hasTheVote: false,
                })),
            }),
            toggleHasTheVote: assign({
                players: (ctx, e: ToggleVoteEvent) => {
                    return ctx.players.map(p =>
                        p.id === e.playerId ?
                            {...p, hasTheVote: !p.hasTheVote} :
                            p);
                },
            }),
            sendEndEventToParent: sendParent(ctx => ({
                type: "VOTING_END",
                playersWithTheVote: ctx.players
                    .filter(p => p.hasTheVote)
                    .map(p => p.id),
            })),
        },
    });