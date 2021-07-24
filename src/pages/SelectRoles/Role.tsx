import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {colors} from "../../utilities";
import {PersistentPlayerRole} from "../../types/PersistentData";
import {PersistentRolesContext} from "../../contexts/PersistentRolesContext";
import useInputNumber from "./hooks/useInputNumber";

type Props = Omit<PersistentPlayerRole, "shortName">
const Role = ({name, side, selected, variety,count}: Props) => {
    const [, dispatch] = useContext(PersistentRolesContext);
    const {result: inputValue, ...inputProperties} = useInputNumber({initialValue: count, minimum: 1, maximum: 999});

    useEffect(() => setRoleCount(), [inputValue]);

    const setRoleCount = () => {
        if (variety === "One") return;

        dispatch({
            type: "SET_COUNT",
            payload: {
                name,
                variety: "Many",
                count: inputValue,
            },
        });
    };
    const toggleRole = () => {
        dispatch({
            type: "TOGGLE_SELECTION",
            payload: name,
        });
    };

    return (
        <RoleComponent selected={selected}>
            <RoleName onClick={toggleRole}>{name}</RoleName>
            <RoleSide selected={selected}>{side === "Citizen" ? "شهر" : "مافیا"}</RoleSide>
            {variety === "Many" && selected ? <VarietyInput {...inputProperties}/> : undefined}
        </RoleComponent>
    );
};

type RoleProps = Pick<Props, "selected">;
const RoleComponent = styled.div<RoleProps>`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-content: center;
  align-items: center;
  margin: .6rem;
  height: 4rem;
  background-color: ${props => props.selected ? colors.secondary : colors.primary};
  opacity: ${props => props.selected ? 1 : .6};
  transition: background-color .5s, opacity .5s;
`;

type RoleSideProps = Pick<Props, "selected">;
const RoleSide = styled.p<RoleSideProps>`
  grid-column: 1/2;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  color: ${colors.white};
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${props => props.selected ? colors.secondary : colors.primary};
  transition: background-color .5s;
`;

const RoleName = styled.button`
  grid-column: 2/3;
  grid-row: 1;
  justify-self: stretch;
  align-self: stretch;
  font-size: 1.9rem;
  color: ${colors.white};
`;

const VarietyInput = styled.input`
  grid-column: 3/4;
  grid-row: 1;
  font-size: 1.9rem;
  text-align: center;
  color: ${colors.white};
  border: none;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.primary};
`;
export default Role;