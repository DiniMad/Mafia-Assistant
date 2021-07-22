import React, {FC} from "react";
import {PlayersProvider} from "./contexts/PlayersContext";

const Providers: FC = ({children}) => {
    return (
        <PlayersProvider>
            {children}
        </PlayersProvider>
    );
};

export default Providers;