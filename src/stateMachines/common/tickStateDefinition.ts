import {assign} from "xstate";

export type TickContext = { elapsedTime: number }
export type TickEvents = { type: "PAUSE" | "RESUME" }

export const resetTick = assign({
    elapsedTime: () => 0,
});

const incrementTick = assign({
    elapsedTime: (context: TickContext) => context.elapsedTime + 1,
});

export const tickStateDefinition = {
    id: "tick",
    initial: "tick",
    states: {
        tick: {
            after: {
                1000: {
                    actions: incrementTick,
                    target: "tick",
                },
            },
            on: {
                PAUSE: "paused",
            },
        },
        paused: {
            on: {
                RESUME: "tick",
            },
        },
    },
};