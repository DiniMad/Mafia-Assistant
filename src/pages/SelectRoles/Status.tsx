import React from "react";
import styled from "styled-components";
import {colors} from "../../utilities";

type Props = {
    players: string,
    roles: string,
    citizens: string,
    mafias: string,
}
const Status = ({players, roles, citizens, mafias}: Props) => {
    return (
        <StatusComponent>
            <TextSpan>{players}</TextSpan>
            <TextSpan>&nbsp;و&nbsp;</TextSpan>
            <TextSpan>{roles}</TextSpan>
            <TextSpan>,&nbsp;</TextSpan>
            <TextSpan>{citizens}</TextSpan>
            <TextSpan>&nbsp;و&nbsp;</TextSpan>
            <TextSpan>{mafias}</TextSpan>
        </StatusComponent>
    );
};

const StatusComponent = styled.h2`
  text-align: center;
  direction: rtl;
  border-bottom: ${colors.primaryLight} solid .4rem;
  padding: 1rem;
`;

const TextSpan = styled.span`
  font-size: 2rem;
  color: ${colors.white};
  transition: opacity .5s;
`;

export default Status;