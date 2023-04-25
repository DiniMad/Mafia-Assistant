import tw from "twin.macro";
import BackgroundImage from "@images/Background.png";
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import Home from "@/pages/home";
import Godfather from "@/pages/godfather";
import {useAppDispatch} from "@/store/hooks";
import {initializePlayersFromStorage} from "@/store/players";
import Players from "./pages/players";

function App() {
    const dispatch = useAppDispatch();
    dispatch(initializePlayersFromStorage());

    return (
        <AppComponent>
            <Routes>
                <Route path={appRoutes.home} element={<Home/>}/>
                <Route path={appRoutes.godfather["*"]} element={<Godfather/>}/>
                <Route path={appRoutes.players} element={<Players/>}/>
            </Routes>
        </AppComponent>
    );
}

const AppComponent = styled.div`
  background: url(${BackgroundImage});
  ${tw`overflow-hidden w-screen h-screen bg-neutral-800 bg-no-repeat bg-cover bg-center`}
`;

export default App;
