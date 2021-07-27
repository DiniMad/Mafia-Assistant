import {GameplayPlayer, Talk} from "./Gameplay";

export class TalkQueue {
    private get talks(): Talk[] {
        return this._talks;
    }
    private set talks(value: Talk[]) {
        this._talks = value;
        this.length = value.length;
    }
    private _talks: Talk[] = [];

    length: number = 0;

    constructor(talks: Talk[]) {
        this.talks = talks;
    }

    static isAnInstance = (value: any): value is TalkQueue => value instanceof TalkQueue;
    
    peak = (index = 0): Talk | undefined => this.talks[index];
    dequeue = (): TalkQueue => {
        const newTalks = [...this.talks];
        newTalks.shift();
        return new TalkQueue(newTalks);
    };
    insertBefore = (playerId: GameplayPlayer["id"], talk: Talk): TalkQueue => {
        const talkIndexToTalkBefore = this._talks.findIndex(t => t.playerId === playerId);
        if (talkIndexToTalkBefore === -1) return this;
        return this.insert(talk, talkIndexToTalkBefore);
    };
    playerIsFirstToTalk = (playerId: GameplayPlayer["id"]) => {
        const firstTalk = this.peak();
        if (!firstTalk) return false;
        return firstTalk.playerId === playerId;
    };
    playerAlreadyTalked = (playerId: GameplayPlayer["id"]) => {
        const playerTalkIndex = this._talks.findIndex(p => p.playerId === playerId && p.type === "discus");
        return playerTalkIndex === -1;
    };
    
    private insert = (talk: Talk, index: number): TalkQueue => {
        const newTalks = [...this.talks];
        newTalks.splice(index, 0, talk);
        return new TalkQueue(newTalks);
    };
}