import {Route, Routes} from "react-router-dom";
import PlayerSelection from "@/pages/godfather/playerSelection";
import appRoutes from "@/utilites/appRoutes";
import RoleSelection from "@/pages/godfather/roleSelection";
import RevealRole from "@/pages/godfather/revealRole";
import GameFlow from "@/pages/godfather/gameFlow";
import {useAppDispatch} from "@/store";
import {initializeRolesFromData} from "@/store/roles";

const Godfather = () => {
    const dispatch = useAppDispatch();
    dispatch(initializeRolesFromData({dataKey: "godfather"}));

    return (
        <Routes>
            <Route index element={<PlayerSelection/>}/>
            <Route path={appRoutes.godfather.roleSelection} element={<RoleSelection/>}/>
            <Route path={appRoutes.godfather.revealRoles} element={<RevealRole/>}/>
            <Route path={appRoutes.godfather.gameFlow} element={<GameFlow/>}/>
        </Routes>
    );
};
export default Godfather;