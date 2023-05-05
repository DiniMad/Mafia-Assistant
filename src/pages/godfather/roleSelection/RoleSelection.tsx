import React from "react";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";
import {useTranslation} from "react-i18next";
import {GodfatherRoleType, useRoles} from "@/store/roles";
import Role from "@/pages/godfather/roleSelection/Role";

const RoleSelection = () => {
    const {t} = useTranslation();
    const roles = useRoles<GodfatherRoleType>();

    return (
        <Layout pageTitle={t("roleSelection")} bottomMenu={<BottomMenu/>}>
            {roles.map(r => <Role key={r.key} role={r}/>)}
        </Layout>
    );
};

const BottomMenu = () =>
    <div tw="flex justify-between items-center h-full w-full">
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.godfather.pathTo("")}>
            <FontAwesomeIcon icon={faArrowLeft} tw="text-white text-2xl"/>
        </Link>
        <Link tw="flex justify-center items-center h-10 w-10"
              to={appRoutes.godfather.pathTo(appRoutes.godfather.revealRoles)}>
            <FontAwesomeIcon icon={faArrowRight} tw="text-white text-2xl"/>
        </Link>
    </div>;

export default RoleSelection;