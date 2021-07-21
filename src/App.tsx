import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

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
`;

export default App;