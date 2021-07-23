import React, {FC} from "react";
import {PersistentPlayersProvider} from "./contexts/PersistentPlayersContext";
import {GameplayProvider} from "./contexts/GameplayContext";

const Providers: FC = ({children}) => {
    return (
        <PersistentPlayersProvider>
            <GameplayProvider>
                {children}
            </GameplayProvider>
        </PersistentPlayersProvider>
    );
};

export default Providers;