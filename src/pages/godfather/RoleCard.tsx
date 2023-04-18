import React, {MouseEventHandler} from "react";
import tw, {styled} from "twin.macro";
import {GodfatherRoleType} from "@/store/roles";
import {useTranslation} from "react-i18next";

type RoleCardProps = {
    roleKey: GodfatherRoleType["key"],
    side: GodfatherRoleType["side"],
    onDoneButtonClicked: MouseEventHandler<HTMLButtonElement>
}
const RoleCard = ({roleKey, side, onDoneButtonClicked}: RoleCardProps) => {
    const {t} = useTranslation();

    return (
        <RoleCardComponent onClick={e => e.stopPropagation()}>
            <RoleImage src={`/src/assets/images/roles/${roleKey}.jpg`} alt="role"/>
            <CardOverlay/>
            <Info>
                <InfoTitle>{t(`godfather:role-${roleKey}`)}</InfoTitle>
                <InfoSide side={side}>{t(`godfather:side-${side}`)}</InfoSide>
                <InfoDescription>{t(`godfather:role-description-${roleKey}`)}
                </InfoDescription>
            </Info>
            <DoneButton onClick={onDoneButtonClicked}>{t("ok")}</DoneButton>
        </RoleCardComponent>
    );
};


const RoleCardComponent = tw.div`relative flex flex-col justify-center items-center w-9/12 h-2/3 bg-background-400 border-2 border-white rounded-2xl overflow-hidden`;

const RoleImage = tw.img`absolute`;

const CardOverlay = tw.div`absolute inset-0 bg-gradient-to-b from-background-400 via-[#00000066] to-background-400 z-10`;

const Info = tw.div`grid grid-rows-[2fr 1fr 5fr] h-full w-full text-white z-20`;
const InfoTitle = tw.h2`row-[1/1] self-end text-center text-2xl font-bold`;
const InfoSide = styled.h3`
  ${tw`row-[2/2] self-center text-center text-lg font-medium`}
  ${({side}: Pick<GodfatherRoleType, "side">) =>
          side === "Citizen" ? tw`text-indigo-600` : side === "Mafia" ? tw`text-rose-500` : tw`text-amber-500`}
`;
const InfoDescription = tw.p`row-[3/3] self-start text-center text-sm mx-4`;

const DoneButton = tw.button`bg-accent-300 text-white font-bold py-2 m-2 px-5 rounded z-10`;
export default RoleCard;