import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import {colors, assets} from "./utilities";
import SelectPlayers from "./pages/SelectPlayers/SelectPlayers";
import Providers from "./Providers";

const App = () => {
    return (
        <AppComponent>
            <Providers>
                <SelectPlayers/>
                <GlobalStyle/>
            </Providers>
        </AppComponent>
    );
};
const AppComponent = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: ${colors.primaryDark} url(${assets.images.background}) no-repeat fixed center;
`;

export default App;