import {Route, Routes, useNavigate} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import DayTalk from "@/pages/godfather/gameFlow/dayTalk";
import {useMachine} from "@xstate/react";
import {gameFlowMachine} from "@/stateMachines/godfather/gameFlowMachine";
import {useEffect} from "react";

// TODO: Game config hook
const challengeTimeWindow = 3000;
const talkTime = 5000;
const challengeTime = 3000;
const goNextAutomatically = () => false;
const expireChallengeAutomatically = () => false;
const GameFlow = () => {
    const [state, send] = useMachine(gameFlowMachine, {
        context: {
            dayTalkMachineOptions: {
                guards: {goNextAutomatically, expireChallengeAutomatically},
                delays: {challengeTimeWindow, talkTime, challengeTime},
            },
        },
    });
    const navigate = useNavigate();

    useEffect(() => {
        navigate(state.context.appRoute);
    }, [state.value]);

    return (
        <Routes>
            <Route path={appRoutes.godfather.gameFlow.dayTalk}
                   element={<DayTalk actor={state.context.dayTalkMachine}/>}/>
        </Routes>
    );
};


export default GameFlow;