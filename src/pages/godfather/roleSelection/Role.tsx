import React, {MouseEvent, useState} from "react";
import tw, {styled} from "twin.macro";
import {useAppDispatch} from "@/store";
import {
    GodfatherRoleType,
    decrementRoleQuantity,
    incrementRoleQuantity,
    toggleSelectRole,
} from "@/store/godfather";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "@components/Modal";
import RoleCard from "@/pages/godfather/RoleCard";

type RoleProps = {
    role: GodfatherRoleType
}
const Role = ({role: {key, side, selected, variety, count}}: RoleProps) => {
    const [showModal, setShowModal] = useState(false);

    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const toggleSelect = () => dispatch(toggleSelectRole({roleKey: key}));
    const decrementQuantity = () => dispatch(decrementRoleQuantity({roleKey: key}));
    const incrementQuantity = () => dispatch(incrementRoleQuantity({roleKey: key}));

    const toggleShowModal = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setShowModal(val => !val);
    };

    return (
        <RoleComponent>
            <RoleSelection selected={selected!!} onClick={toggleSelect}>
                <SelectButton/>
                <RoleSide side={side}>{t(`godfather-side-${side}`)}</RoleSide>
                <RoleName>{t(`godfather-role-${key}`)}</RoleName>
                <InfoButton onClick={toggleShowModal}>
                    <FontAwesomeIcon tw="text-white text-lg" icon={faCircleInfo}/>
                </InfoButton>
            </RoleSelection>
            <RoleQuantity show={!!selected && variety === "Many"}>
                <QuantityDecrementButton onClick={decrementQuantity}>
                    <FontAwesomeIcon icon={faMinus}/>
                </QuantityDecrementButton>
                <QuantityLabel>{count}</QuantityLabel>
                <QuantityIncrementButton onClick={incrementQuantity}>
                    <FontAwesomeIcon icon={faPlus}/>
                </QuantityIncrementButton>
            </RoleQuantity>
            <Modal show={showModal} onWrapperClicked={toggleShowModal}>
                <RoleCard roleKey={key} side={side} onDoneButtonClicked={toggleShowModal}/>
            </Modal>
        </RoleComponent>
    );
};


const RoleComponent = tw.div`flex flex-col justify-center m-1.5`;

const RoleSelection = styled.div`
  ${tw`grid grid-cols-[1fr 5fr 1fr] items-center w-full h-10 px-3 transition-colors duration-500`}
  ${({selected}: { selected: boolean }) =>
          selected ? tw`bg-accent-300` : tw`bg-background-300 bg-opacity-70`};
`;

const SelectButton = tw.button`col-[1/3] row-[1/1] h-full`;

const RoleSide = styled.p`
  ${tw`col-[1/1] row-[1/1] text-center text-sm font-medium overflow-hidden`}
  ${({side}: Pick<GodfatherRoleType, "side">) =>
          side === "Citizen" ? tw`text-indigo-600` : side === "Mafia" ? tw`text-rose-500` : tw`text-amber-500`}
`;

const RoleName = tw.p`col-[2/2] row-[1/1] text-center text-white font-bold overflow-hidden`;

const InfoButton = tw.button`col-[3/3] row-[1/1] justify-self-center flex justify-center items-center w-8 h-8`;

const RoleQuantity = styled.div`
  ${tw`bg-accent-300 grid grid-cols-[1fr 5fr 1fr] justify-center items-center px-3 transition-transform origin-top`}
  ${({show}: { show: boolean }) => show ? tw`scale-y-100` : tw`scale-y-0 h-0`}
`;
const QuantityDecrementButton = tw.button`bg-white col-[1/1] text-black  w-10 mx-auto rounded`;
const QuantityIncrementButton = tw(QuantityDecrementButton)`col-[3/3]`;
const QuantityLabel = tw.span`col-[2/2] text-white text-center text-lg`;
export default Role;