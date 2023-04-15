import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/pages/godfather/Layout";
import {useTranslation} from "react-i18next";

const RoleSelection = () => {
    const {t} = useTranslation();

    return (
        <Layout pageTitle={t("revealRole")} bottomMenu={<BottomMenu/>}>
        </Layout>
    );
};

const BottomMenu = () =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.godfather.pathTo(appRoutes.godfather.roleSelection)}>
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl"/>
        </Link>
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.godfather.pathTo(appRoutes.godfather.gameFlow)}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl"/>
        </Link>
    </div>;

export default RoleSelection;