import React, {FC} from "react";
import {PersistentPlayersProvider} from "./contexts/PersistentPlayersContext";
import {GameplayProvider} from "./contexts/GameplayContext";
import {PersistentRolesProvider} from "./contexts/PersistentRolesContext";

const Providers: FC = ({children}) => {
    return (
        <PersistentPlayersProvider>
            <PersistentRolesProvider>
                <GameplayProvider>
                    {children}
                </GameplayProvider>
            </PersistentRolesProvider>
        </PersistentPlayersProvider>
    );
};

export default Providers;