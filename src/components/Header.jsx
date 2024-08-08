import { Button, FlexElement } from './styles';

export const Header = ({reset, handleSizeSelect}) => {
  return (
    <>
    <h2>Tic Tac Toe</h2>
    <div>
      <span>Select Board Size:</span>
      <Button onClick={reset}>Reset</Button>
    </div>
    <FlexElement>
      <Button onClick={() => handleSizeSelect(3)}>3x3</Button>
      <Button onClick={() => handleSizeSelect(4)}>4x4</Button>
      <Button onClick={() => handleSizeSelect(5)}>5x5</Button>
    </FlexElement>
    </>
  )
} 