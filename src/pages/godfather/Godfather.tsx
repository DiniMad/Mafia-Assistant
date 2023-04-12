import {Route, Routes} from "react-router-dom";
import PlayerSelection from "@/pages/godfather/playerSelection";

const Godfather = () => {

    return (
        <Routes>
            <Route index element={<PlayerSelection/>}/>
        </Routes>
    );
};
export default Godfather;