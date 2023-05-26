import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {useMachine} from "@xstate/react";
import {gameFlowMachine} from "@/stateMachines/godfather/gameFlowMachine";
import {useGodfatherGamePlayers} from "@/store/godfatherGame";
import {ELIMINATION_CARD_KEYS, EliminationCard} from "@/types/godfatherGame";
import TalkRoom from "@/pages/godfather/gameFlow/talkRoom";
import Voting from "@/pages/godfather/gameFlow/voting";
import Elimination from "@/pages/godfather/gameFlow/elimination/Elimination";
import NightAction from "@/pages/godfather/gameFlow/nightAction/NightAction";

// TODO: Game config hook
const challengeTimeWindow = 3000;
const talkTime = 5000;
const challengeTime = 3000;
const goNextAutomatically = () => false;
const expireChallengeAutomatically = () => false;

const eliminationCards = ELIMINATION_CARD_KEYS.map<EliminationCard>(key => ({key, available: true}));
const GameFlow = () => {
    const navigate = useNavigate();
    const players = useGodfatherGamePlayers();
    const [state, send] = useMachine(gameFlowMachine, {
        context: {
            eliminationCards,
            talkingMachineOptions: {
                guards: {goNextAutomatically, expireChallengeAutomatically},
                delays: {challengeTimeWindow, talkTime, challengeTime},
            },
        },
    });

    useEffect(() => {
        if (players.length > 0) send({type: "INITIALIZE", players});
    }, [players.length]);

    useEffect(() => {
        navigate(state.context.appRoute);
    }, [state.context.appRoute]);

    return (
        <Routes>
            <Route path={appRoutes.godfather.gameFlow.talkRoom}
                   element={<TalkRoom actor={state.context.talkingMachine}/>}/>
            <Route path={appRoutes.godfather.gameFlow.voting}
                   element={<Voting actor={state.context.votingMachine}/>}/>
            <Route path={appRoutes.godfather.gameFlow.elimination}
                   element={<Elimination actor={state.context.eliminationMachine}/>}/>
            <Route path={appRoutes.godfather.gameFlow.nightAction}
                   element={<NightAction actor={state.context.nightActionMachine}/>}/>
        </Routes>
    );
};


export default GameFlow;