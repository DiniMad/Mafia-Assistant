import React from "react";
import tw from "twin.macro";
import {Context} from "@/stateMachines/godfather/eliminationMachine";
import {useTranslation} from "react-i18next";

type AnnouncementProps = {
    announcement: Context["announcement"],
    done: () => void
}
const Announcement = ({announcement, done}: AnnouncementProps) => {
    const {t} = useTranslation();

    return (
        <AnnouncementComponent>
            <AnnouncementText>
                <AnnouncementTitle>
                    {t(`godfather:${announcement?.title!}`)}
                </AnnouncementTitle>
                <AnnouncementDescription>
                    {t(`godfather:${announcement?.description!}`,
                        {prop: t(`godfather:${announcement?.descriptionProp!}`)})}
                </AnnouncementDescription>
            </AnnouncementText>
            <AnnouncementDoneButton onClick={done}>
                {t("ok")}
            </AnnouncementDoneButton>
        </AnnouncementComponent>
    );
};

const AnnouncementComponent = tw.div`bg-background-300 flex flex-col justify-between items-center h-5/6 w-full m-8 py-10`;
const AnnouncementText = tw.div`flex flex-col justify-start items-center h-full`;
const AnnouncementTitle = tw.h3`text-white text-2xl font-bold`;
const AnnouncementDescription = tw.h3`text-white text-center text-lg m-5`;
const AnnouncementDoneButton = tw.button`bg-accent-300 h-10 w-40 text-white text-lg`;

export default Announcement;