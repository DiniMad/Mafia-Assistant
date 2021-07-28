import React from "react";
import PageLayout from "../../components/PageLayout";

const NightSleep = () => {
    return (
        <PageLayout pageTitle={"خواب شب"}>
            {
                () => {
                    return {
                        content: <></>,
                        menuContent: <></>,
                    };
                }
            }
        </PageLayout>
    );
};

export default NightSleep;