import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import GlobalStyles from "@components/GlobalStyles";
import {BrowserRouter} from "react-router-dom";
import '@/i18n/config';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyles/>
        <BrowserRouter> <App/> </BrowserRouter>
    </React.StrictMode>,
);
