import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {useMachine} from "@xstate/react";
import {gameFlowMachine} from "@/stateMachines/godfather/gameFlowMachine";
import {useGodfatherGamePlayers} from "@/store/godfatherGame";
import TalkRoom from "@/pages/godfather/gameFlow/talkRoom";
import Voting from "@/pages/godfather/gameFlow/voting";

// TODO: Game config hook
const challengeTimeWindow = 3000;
const talkTime = 5000;
const challengeTime = 3000;
const goNextAutomatically = () => false;
const expireChallengeAutomatically = () => false;
const GameFlow = () => {
    const navigate = useNavigate();
    const players = useGodfatherGamePlayers();
    const [state, send] = useMachine(gameFlowMachine, {
        context: {
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
    }, [state.value]);

    return (
        <Routes>
            <Route path={appRoutes.godfather.gameFlow.talkRoom}
                   element={<TalkRoom actor={state.context.talkingMachine}/>}/>
            <Route path={appRoutes.godfather.gameFlow.voting}
                   element={<Voting actor={state.context.votingMachine}/>}/>
        </Routes>
    );
};


export default GameFlow;