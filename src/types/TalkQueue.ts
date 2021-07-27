import {GameplayPlayer, Talk} from "./Gameplay";

declare global {
    interface Array<T extends Talk> {
        peak(index?: number): T | undefined;

        dequeue(): Talk[];

        insert(talk: Talk, index: number): Talk[];

        insertBefore(talk: Talk, playerId: GameplayPlayer["id"]): Talk[];

        playerIsFirstToTalk(playerId: GameplayPlayer["id"]): boolean;

        playerAlreadyTalked(playerId: GameplayPlayer["id"]): boolean;
    }
}

Array.prototype.peak = function <T extends Talk>(this: T[], index = 0) {
    return this[index];
};
Array.prototype.dequeue = function <T extends Talk>(this: T[]) {
    const newTalks = [...this];
    newTalks.shift();
    return newTalks;
};
Array.prototype.insert = function <T extends Talk>(this: T[], talk: T, index: number) {
    const newTalks = [...this];
    newTalks.splice(index, 0, talk);
    return newTalks;
};
Array.prototype.insertBefore = function <T extends Talk>(this: T[], talk: T, playerId: GameplayPlayer["id"]) {
    const talkIndexToTalkBefore = this.findIndex(t => t.playerId === playerId);
    if (talkIndexToTalkBefore === -1) return this;
    return this.insert(talk, talkIndexToTalkBefore);
};
Array.prototype.playerIsFirstToTalk = function <T extends Talk>(this: T[], playerId: GameplayPlayer["id"]) {
    const firstTalk = this.peak();
    if (!firstTalk) return false;
    return firstTalk.playerId === playerId;
};
Array.prototype.playerAlreadyTalked = function <T extends Talk>(this: T[], playerId: GameplayPlayer["id"]) {
    const playerTalkIndex = this.findIndex(p => p.playerId === playerId && p.type === "discus");
    return playerTalkIndex === -1;
};

export const initializeTalkQueueType = () => {
};