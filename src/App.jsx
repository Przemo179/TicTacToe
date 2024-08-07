import React from "react";
import { GameBoard } from "./components/GameBoard";
import { Container } from './components/styles/Container.styled';

function App() {
  return (
    <Container>
      <GameBoard />
    </Container>
  );
}

export default App;
