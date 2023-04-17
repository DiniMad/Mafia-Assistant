import React from "react";
import styled from "styled-components";
import GodfatherImage from "@images/Godfather.jpg";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation();

    return (
        <Wrapper>
            <GodfatherLink to={appRoutes.godfather.pathTo("")}>
                <GodfatherImg/>
                <GodfatherLinkPingEffect/>
            </GodfatherLink>
        </Wrapper>
    );
};

const Wrapper = tw.div`flex justify-center items-center h-full`;

const GodfatherLink = tw(Link)`grid w-44 h-44 rounded-xl border-2 border-white`;

const GodfatherImg = styled.div`
  background: red url(${GodfatherImage});
  ${tw`row-[1/1] col-[1/1] w-full h-full bg-cover rounded-xl z-10`}
`;

const GodfatherLinkPingEffect = tw.div`row-[1/1] col-[1/1] bg-accent-300 rounded-xl animate-ping-small`;


export default Home;