import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import {colors, assets} from "./utilities";

const App = () => {
    return (
        <AppComponent>
            <GlobalStyle/>
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