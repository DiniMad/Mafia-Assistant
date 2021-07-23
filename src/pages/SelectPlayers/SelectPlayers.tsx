import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import Players from "./Players";
import PageLayout from "../../components/PageLayout";

const SelectPlayers = () => {
    return (
        <PageLayout pageTitle={"انتخاب بازیکنان"}>
            {
                () => {
                    return {
                        content: <Players/>,
                        menuContent: <>
                            <MenuButton>{"بازگشت"}</MenuButton>
                            <MenuButton>{"ویرایش بازیکنان"}</MenuButton>
                            <MenuButton>{"ادامه"}</MenuButton>
                        </>,
                    };
                }
            }
        </PageLayout>
    );
};

const MenuButton = styled.button`
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  padding: .5rem 1.2rem;
`;

export default SelectPlayers;