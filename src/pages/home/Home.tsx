import React from "react";
import styled from "styled-components";
import GodfatherImage from "@images/Godfather.png";
import tw from "twin.macro";
import {Link} from "react-router-dom";
import appRoutes from "@/utilites/appRoutes";

const Home = () => {
    return (
        <Wrapper>
            <GodfatherLink to={appRoutes.godfather}>
                <GodfatherImg/>
                <GodfatherImgOverlay>
                    <p>Godfather</p>
                </GodfatherImgOverlay>
            </GodfatherLink>
        </Wrapper>
    );
};

const Wrapper = tw.div`flex justify-center items-center h-full`;

const GodfatherLink = tw(Link)`relative flex justify-center items-center overflow-hidden w-44 h-44 p-5 rounded-3xl bg-neutral-500 drop-shadow-xl`;

const GodfatherImg = styled.div`
  background: url(${GodfatherImage});
  ${tw`w-full h-full bg-cover`}
`;

const GodfatherImgOverlay = tw.div`absolute flex justify-center items-center w-full h-full bg-neutral-900 bg-opacity-60 text-[#ef6c00] font-bold text-3xl`;


export default Home;