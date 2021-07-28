import React, {useContext, useEffect} from "react";
import PageLayout from "../../components/PageLayout";
import styled from "styled-components";
import {colors, routes} from "../../utilities";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import useInputNumber from "../../hooks/useInputNumber";
import {GameplayContext} from "../../contexts/GameplayContext";

const Config = () => {
    const [{config}, dispatch] = useContext(GameplayContext);
    const {result: talkTime, ...talkTimeInput} =
        useInputNumber({initialValue: config.talkTime, minimum: 1, maximum: 999});
    const {result: challengeTime, ...challengeTimeInput} =
        useInputNumber({initialValue: config.challengeTime, minimum: 1, maximum: 999});
    const {result: defenceTime, ...defenceTimeInput} =
        useInputNumber({initialValue: config.defenseTime, minimum: 1, maximum: 999});

    useEffect(() => dispatch({type: "SET_TALK_TIME", payload: talkTime}), [talkTime]);
    useEffect(() => dispatch({type: "SET_CHALLENGE_TIME", payload: challengeTime}), [challengeTime]);
    useEffect(() => dispatch({type: "SET_DEFENCE_TIME", payload: defenceTime}), [defenceTime]);

    return (
        <PageLayout pageTitle={"تنظیمات"}>
            {
                () => {
                    return {
                        content:
                            <ConfigComponent>
                                <InputItem>
                                    <Input id={"talk-time"} placeholder={"ثانیه"} {...talkTimeInput}/>
                                    <InputLabel htmlFor={"talk-time"}>زمان صحبت</InputLabel>
                                </InputItem>
                                <InputItem>
                                    <Input id={"challenge-time"} placeholder={"ثانیه"} {...challengeTimeInput}/>
                                    <InputLabel htmlFor={"challenge-time"}>زمان چالش</InputLabel>
                                </InputItem>
                                <InputItem>
                                    <Input id={"defence-time"} placeholder={"ثانیه"} {...defenceTimeInput}/>
                                    <InputLabel htmlFor={"defence-time"}>زمان دفاع</InputLabel>
                                </InputItem>
                            </ConfigComponent>,
                        menuContent:
                            <>
                                <MenuButton as={Link} to={routes.start}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                </MenuButton>
                            </>,
                    };
                }
            }
        </PageLayout>
    );
};

const ConfigComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;

const InputItem = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 90%;
`;

const InputLabel = styled.label`
  font-size: 1.9rem;
  text-align: center;
  color: ${colors.white};
  width: 60%;
`;

const Input = styled.input`
  font-size: 1.9rem;
  text-align: center;
  color: ${colors.white};
  border: none;
  background-color: ${colors.primary};
  height: 3.5rem;
  width: 40%;

  &:focus {
    outline: none;
    border: ${colors.secondaryDark} solid .1rem;
  }
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: bold;
  color: ${colors.white};
  padding: .5rem 1.2rem;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
}
`;

export default Config;