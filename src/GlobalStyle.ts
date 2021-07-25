import {createGlobalStyle, css} from "styled-components";
import {colors, colorWithOpacity} from "./utilities";

const ModalStyles = css`
  .ReactModal__Overlay {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    background-color: ${colorWithOpacity(colors.primaryDark, .8)} !important;

    .ReactModal__Content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: static !important;
      border: ${colors.primaryLight} solid .3rem !important;
      height: fit-content !important;
      background-color: ${colors.primary} !important;
    }
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-size: 10px;
    overscroll-behavior-y: contain;
  }

  a {
    text-decoration: none;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
  }

  ${ModalStyles}
`;

export default GlobalStyle;