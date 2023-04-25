import React, { AnimationEventHandler, MouseEventHandler, useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { Link } from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faUndo } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { usePlayers } from "@/store/players";
import Player from "@/pages/godfather/revealRole/Player";
import { useRoles } from "@/store/roles";
import { useDispatch } from "react-redux";
import { assignRolesToPlayersRandomly, useGodfatherGamePlayers } from "@/store/godfatherGame";

const RoleSelection = () => {
    const [reshuffleAnimation, setReshuffleAnimation] = useState(false);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const players = usePlayers();
    const roles = useRoles();
    const godfatherPlayers = useGodfatherGamePlayers();

    useEffect(() => {
        dispatch(assignRolesToPlayersRandomly({ players, roles }));
    }, []);

    const shuffleRoles = () => {
        dispatch(assignRolesToPlayersRandomly({ players, roles }));
        setReshuffleAnimation(true);
    };
    const resetReshuffleAnimation = () => setReshuffleAnimation(false);

    return (
        <Layout pageTitle={t("assignRole")}
            bottomMenu={<BottomMenu shuffleRoles={shuffleRoles}
                onShuffleAnimationEnded={resetReshuffleAnimation}
                reshuffleAnimation={reshuffleAnimation} />}>
            <PlayerList>
                {godfatherPlayers.map(p => <Player key={p.id} player={p} />)}
            </PlayerList>
        </Layout>
    );
};

const PlayerList = tw.div`flex flex-col justify-start`;


const BottomMenu = ({ shuffleRoles, onShuffleAnimationEnded, reshuffleAnimation }: {
    shuffleRoles: MouseEventHandler<HTMLButtonElement>,
    onShuffleAnimationEnded: AnimationEventHandler<SVGSVGElement>,
    reshuffleAnimation: boolean
}) =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
            to={appRoutes.godfather.pathTo(appRoutes.godfather.roleSelection)}>
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl" />
        </Link>
        <button tw="flex justify-center items-center h-10 w-10" onClick={shuffleRoles}>
            <ReshuffleIcon icon={faUndo}
                animation={reshuffleAnimation}
                onAnimationEnd={onShuffleAnimationEnded} />
        </button>
        <Link tw="flex justify-center items-center h-10 w-10"
            to={appRoutes.godfather.pathTo(appRoutes.godfather.gameFlow)}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl" />
        </Link>
    </div>;

const ReshuffleIcon = styled(FontAwesomeIcon)`
  ${tw`text-white text-2xl`}
  ${({ animation }: { animation: boolean }) => animation && tw`animate-rotate`}
`;

export default RoleSelection;