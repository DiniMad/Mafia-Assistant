import React from "react";
import PageLayout from "../../components/PageLayout";

const VoteRoom = () => {
    return (
        <PageLayout pageTitle={"رای گیری"}>
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

export default VoteRoom;