import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import {colors, assets, routes} from "./utilities";
import Providers from "./Providers";
import StartPage from "./pages/Start";
import SelectPlayers from "./pages/SelectPlayers";
import SelectRoles from "./pages/SelectRoles";
import RevealRoles from "./pages/RevealRoles";
import TalkRoom from "./pages/TalkRoom";
import ModifyPlayers from "./pages/ModifyPlayers";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {vh, vw} from "./utilities";

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
                        <Route exact path={routes.modifyPlayers}> <ModifyPlayers/> </Route>
                    </Switch>
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