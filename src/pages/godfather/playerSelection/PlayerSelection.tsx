import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import PlayerList from "@/pages/godfather/playerSelection/PlayerList";
import tw from "twin.macro";
import { Link, useLocation } from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const PlayerSelection = () => {
    const { t } = useTranslation();

    const location = useLocation()
    const searchParams = new URLSearchParams();
    searchParams.append("returnUrl", location.pathname);
    const editPlayersUrl = `${appRoutes.players}?${searchParams}`

    return (
        <Layout pageTitle={t("playerSelection")} bottomMenu={<BottomMenu editPlayerUrl={editPlayersUrl} />}>
            <PlayerList />
        </Layout>
    );
};
const BottomMenu = ({ editPlayerUrl }: { editPlayerUrl: string }) =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
            to={appRoutes.home}>
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl" />
        </Link>
        <Link tw="flex justify-center items-center h-10 w-10"
            to={editPlayerUrl}>
            <FontAwesomeIcon icon={faUserEdit} tw="text-white text-2xl" />
        </Link>
        <Link tw="flex justify-center items-center h-10 w-10"
            to={appRoutes.godfather.pathTo(appRoutes.godfather.roleSelection)}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl" />
        </Link>
    </div>;

export default PlayerSelection;