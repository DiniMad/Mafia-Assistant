import React, {CSSProperties, ReactNode, MouseEventHandler, PropsWithChildren} from "react";
import {createPortal} from "react-dom";
import tw from "twin.macro";

type ModalProps = PropsWithChildren & {
    show: boolean,
    modalStyles?: CSSProperties,
    onWrapperClicked?: MouseEventHandler<HTMLDivElement>
}
const Modal = ({show, modalStyles, children, onWrapperClicked}: ModalProps) => {
    if (!show) return null;

    return createPortal((
        <ModalComponent style={modalStyles} onClick={onWrapperClicked}>
            {children}
        </ModalComponent>
    ), document.body);
};

const ModalComponent = tw.div`bg-background-400 fixed inset-0 flex justify-center items-center bg-opacity-70`;

export default Modal;