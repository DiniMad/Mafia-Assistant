import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-size: 10px;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;