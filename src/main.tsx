import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import GlobalStyles from "@components/GlobalStyles";
import {BrowserRouter} from "react-router-dom";
import "@/i18n/config";
import {Provider} from "react-redux";
import {store} from "@/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <GlobalStyles/>
        <BrowserRouter> <App/> </BrowserRouter>
    </Provider>,
);
