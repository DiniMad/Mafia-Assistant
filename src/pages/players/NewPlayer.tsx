import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, KeyboardEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

type NewPlayerProps = {
    addNewPlayer: (playerName: string) => void
}
function NewPlayer({ addNewPlayer }: NewPlayerProps) {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement | null>(null)

    const callAddNewPlayer = (e: MouseEvent | KeyboardEvent) => {
        if ((e as KeyboardEvent).key && (e as KeyboardEvent).key !== "Enter") return;
        if (!inputRef.current || inputRef.current.value === "") return;

        addNewPlayer(inputRef.current.value)
        inputRef.current.value = "";
    }

    return (
        <NewPlayerComponent>
            <NewPlayerInput type="text" placeholder={t("playerName")} ref={inputRef} onKeyUp={callAddNewPlayer} />
            <NewPlayerSaveButton onClick={callAddNewPlayer}>
                <NewPlayerSaveButtonIcon icon={faCheck} />
            </NewPlayerSaveButton>
        </NewPlayerComponent>
    )
}

const NewPlayerComponent = tw.div`grid grid-cols-[5fr_1fr] justify-center items-center mx-1 m-1`

const NewPlayerInput = tw.input`bg-background-200 col-[1/3] row-[1/1] text-white text-center text-lg h-10 focus-visible:outline-none`

const NewPlayerSaveButton = tw.button`col-[2/3] row-[1/1] justify-self-center bg-background-400 flex justify-center items-center h-8 w-8`;
const NewPlayerSaveButtonIcon = tw(FontAwesomeIcon)`text-white text-2xl`

export default NewPlayer