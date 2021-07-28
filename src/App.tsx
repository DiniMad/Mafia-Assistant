import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import {colors, assets, routes} from "./utilities";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Providers from "./Providers";
import StartPage from "./pages/Start";
import SelectPlayers from "./pages/SelectPlayers";
import SelectRoles from "./pages/SelectRoles";
import RevealRoles from "./pages/RevealRoles";
import TalkRoom from "./pages/TalkRoom";
import VoteRoom from "./pages/VoteRoom";
import NightSleep from "./pages/NightSleep";
import ModifyPlayers from "./pages/ModifyPlayers";
import Config from "./pages/Config";
import {vh, vw} from "./utilities";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <AppComponent>
                <Providers>
                    <Switch>
                        <Route exact path={routes.start}> <StartPage/> </Route>
                        <Route exact path={routes.selectPlayers}> <SelectPlayers/> </Route>
                        <Route exact path={routes.selectRoles}> <SelectRoles/> </Route>
                        <Route exact path={routes.revealRoles}> <RevealRoles/> </Route>
                        <Route exact path={routes.talkRoom}> <TalkRoom/> </Route>
                        <Route exact path={routes.voteRoom}> <VoteRoom/> </Route>
                        <Route exact path={routes.nightSleep}> <NightSleep/> </Route>
                        <Route exact path={routes.modifyPlayers}> <ModifyPlayers/> </Route>
                        <Route exact path={routes.config}> <Config/> </Route>
                    </Switch>
                    <Toaster/>
                    <GlobalStyle/>
                </Providers>
            </AppComponent>
        </Router>
    );
};

const AppComponent = styled.div`
  overflow: hidden;
  width: ${vw(100)};
  height: ${vh(100)};
  background: ${colors.primaryDark} url(${assets.images.background}) no-repeat fixed center;
`;

export default App;