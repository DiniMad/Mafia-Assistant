import React from "react";
import tw from "twin.macro";
import {useTranslation} from "react-i18next";
import {Context} from "@/stateMachines/godfather/nightActionMachine";

type NightActionGuidProps = {
    announcement: Exclude<Context["announcement"], undefined>,
    next: () => void,
    chooseAnswer: (index: number) => void,
}
const NightActionAnnouncement = ({announcement, next, chooseAnswer}: NightActionGuidProps) => {
    const {t} = useTranslation();

    const isMultiAnswer = "choices" in announcement;
    const title = "titleKey" in announcement ? t(`godfather:${announcement.titleKey}`) : undefined;
    const text = t(`godfather:${announcement.textKey}`, {
        prop: "propKey" in announcement ? t(announcement.propKey) : undefined,
    });

    return (
        <NightActionAnnouncementComponent>
            <GuidTitle>{title}</GuidTitle>
            <GuidText>{text}</GuidText>
            {isMultiAnswer ?
                <MultiAnswerContainer>
                    {announcement.choices.map((c, i) =>
                        <MultiAnswerButton key={i} onClick={() => chooseAnswer(i)}>
                            {t(`godfather:${c!}`)}
                        </MultiAnswerButton>)}
                </MultiAnswerContainer> :
                <GuidOkButton onClick={next}>{t("ok")}</GuidOkButton>
            }
        </NightActionAnnouncementComponent>
    );
};

const NightActionAnnouncementComponent = tw.div`bg-background-300 flex flex-col flex-wrap justify-between items-center h-5/6 w-full m-8 p-6`;
const GuidTitle = tw.button`text-white text-2xl font-bold text-center`;
const GuidText = tw.button`text-white text-xl text-center`;
const MultiAnswerContainer = tw.div`flex flex-wrap justify-center items-center`;
const MultiAnswerButton = tw.button`bg-accent-300 text-white text-lg h-10 w-24 m-2`;
const GuidOkButton = tw.button`bg-accent-300 text-white text-lg h-10 w-40`;


export default NightActionAnnouncement;