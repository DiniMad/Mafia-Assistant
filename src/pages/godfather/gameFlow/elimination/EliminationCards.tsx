import tw from "twin.macro";
import {EliminationCard} from "@/types/godfatherGame";

type RoleCardProps = {
    cards: EliminationCard["key"][],
    select: (index: number) => void,
}
const EliminationCards = ({cards, select}: RoleCardProps) => {

    return (
        <EliminationCardsComponent>
            {cards.map((_, index) =>
                <Card key={index} onClick={() => select(index)}>{index}</Card>)}
        </EliminationCardsComponent>
    );
};

const EliminationCardsComponent = tw.div`bg-background-300 flex flex-wrap justify-center items-center h-5/6 w-full m-8`;

const Card = tw.button`bg-accent-300 h-36 w-24 m-5 text-white text-3xl font-bold rounded-lg`;

export default EliminationCards;