import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import Players, {PlayersComponent} from "./Players";
import PageTitle, {PageTitleComponent} from "../../components/PageTitle";

const SelectPlayers = () => {
    return (
        <SelectPlayersComponent>
            <PageTitle title={"انتخاب بازیکنان"}/>
            <Players/>
            <Menu>
                <MenuButton>{"بازگشت"}</MenuButton>
                <MenuButton>{"ویرایش بازیکنان"}</MenuButton>
                <MenuButton>{"ادامه"}</MenuButton>
            </Menu>
        </SelectPlayersComponent>
    );
};

const SelectPlayersComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${PageTitleComponent} {
    flex: 1;
  }

  ${PlayersComponent} {
    flex: 10;
  }
`;

const Menu = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .5rem;
  background-color: ${colors.primary};
`;

const MenuButton = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.white};
  padding: .3rem .8rem;
`;

export default SelectPlayers;