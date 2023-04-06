import tw from "twin.macro";
import BackgroundImage from "@images/Background.png";
import styled from "styled-components";

function App() {

    return (
        <AppComponent>

        </AppComponent>
    );
}

const AppComponent = styled.div`
  background: url(${BackgroundImage});
  ${tw`overflow-hidden w-screen h-screen bg-neutral-800 bg-no-repeat bg-fixed bg-center`}
`;

export default App;
