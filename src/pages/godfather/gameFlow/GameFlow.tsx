import tw from "twin.macro";
import {Navigate, Route, Routes} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import DayTalk from "@/pages/godfather/gameFlow/dayTalk";

const GameFlow = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={appRoutes.godfather.gameFlow.dayTalk}/>}/>
            <Route path={appRoutes.godfather.gameFlow.dayTalk} element={<DayTalk/>}/>
        </Routes>
    );
};


export default GameFlow;