import {useTranslation} from "react-i18next";
import Layout from "@/pages/godfather/Layout";
import PlayerList from "@/pages/godfather/playerSelection/PlayerList";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight,faUserEdit} from "@fortawesome/free-solid-svg-icons";

const PlayerSelection = () => {
    const {t} = useTranslation();

    return (
        <Layout pageTitle={t("playerSelection")} bottomMenu={<BottomMenu/>}>
            <PlayerList/>
        </Layout>
    );
};
const BottomMenu = () =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.home}>
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl"/>
        </Link> 
        <Link tw="flex justify-center items-center h-10 w-10"
              to="">
            <FontAwesomeIcon icon={faUserEdit} tw="text-white text-2xl"/>
        </Link>
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.godfather.pathTo(appRoutes.godfather.roleSelection)}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl"/>
        </Link>
    </div>;

export default PlayerSelection;