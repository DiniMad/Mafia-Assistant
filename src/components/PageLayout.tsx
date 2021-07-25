import React, {CSSProperties, ReactChild} from "react";
import styled from "styled-components";
import {colors} from "../utilities";

type Props = {
    pageTitle: string,
    children: () => {
        content: ReactChild,
        menuContent: ReactChild,
    },
    pageStyles?: CSSProperties
}
const PageLayout = ({pageTitle, children, pageStyles}: Props) => {
    const {content, menuContent} = children();
    return (
        <PageLayoutComponent style={pageStyles}>
            <PageTitle>{pageTitle}</PageTitle>
            <Content>{content}</Content>
            <Menu>{menuContent}</Menu>
        </PageLayoutComponent>
    );
};

const PageLayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PageTitle = styled.h1`
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  color: ${colors.white};
  border-bottom: ${colors.primaryDark} solid .3rem;
  background-color: ${colors.primary};
`;

const Content = styled.div`
  height: 84%;
`;

const Menu = styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .8rem;
  background-color: ${colors.primary};
`;

export default PageLayout;