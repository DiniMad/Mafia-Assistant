import React from "react";
import styled from "styled-components";
import {colors} from "../utilities";

type Props = {
    title: string
}
const PageTitle = ({title}: Props) => {
    return (
        <PageTitleComponent>
            <Title>{title}</Title>
        </PageTitleComponent>
    );
};

const PageTitleComponent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.white};
`;

export default PageTitle;