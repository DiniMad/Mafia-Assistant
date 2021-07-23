import React, {FC} from "react";
import {PlayersProvider} from "./contexts/PlayersContext";
import {GameplayProvider} from "./contexts/GameplayContext";

const Providers: FC = ({children}) => {
    return (
        <PlayersProvider>
            <GameplayProvider>
                {children}
            </GameplayProvider>
        </PlayersProvider>
    );
};

export default Providers;