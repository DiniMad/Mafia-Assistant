import React, {ChangeEvent, useState, FocusEvent} from "react";

type Props = {
    initialValue: number,
    minimum: number,
    maximum: number,
}
const useInputNumber = ({initialValue, minimum, maximum}: Props) => {
    const [inputValue, setInputValue] = useState(initialValue.toString());
    const [result, setResult] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        let value = e.target.value;

        const regex = new RegExp(/^\d+$/);
        const isValueValidNumber = regex.test(value);
        if (!isValueValidNumber) value = initialValue.toString();

        const number = parseInt(value);
        if (number < minimum || number > maximum) return;

        setResult(number);
        setInputValue(number.toString())
    };

    return {value: inputValue, onChange, onBlur, result};
};

export default useInputNumber;