import React, {ChangeEvent, useState} from "react";

type Props = {
    maxLength: number
}
const useInput = ({maxLength}: Props): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
    const [text, setText] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > maxLength) return;

        setText(value);
    };
    const reset = () => setText("");

    return [text, onChange, reset];
};

export default useInput;