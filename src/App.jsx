import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Button from "./ui/Button"
import Input from "./ui/Input"

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: yellow;
`;

const StyledApp = styled.main`
  padding: 20px;
`;

export default function App() {

  return (

    <>
      <GlobalStyles />

      <StyledApp>

        <H1>Hello React</H1>
        <Button onClick={() => alert("Hello World!!!")}>Get</Button>

        <div>
          <Input />
        </div>

      </StyledApp>

    </>

  )

}