import { useMachine } from '@xstate/react';
import { Button, Card, FlexElement, Cell, Board, BoardLine } from './styles';
import { stateMachine } from '../store';

export const GameBoard = () => {
  const [state, send] = useMachine(stateMachine);

  const handleSizeSelect = (size) => {
    send({ type: 'SELECT_SIZE', size });
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    if (state.context.winner) return;

    const type = state.context.currentPlayer === 'X' ? 'XMARK' : 'CIRCLE';
    send({ type, rowIndex, cellIndex });
  };

  return (
    <Card>
      <h2>Tic Tac Toe</h2>
      <div>
        <span>Select Board Size:</span>
        <Button onClick={() => send({ type: 'RESET' })}>Reset</Button>
      </div>
      <FlexElement>
        <Button onClick={() => handleSizeSelect(3)}>3x3</Button>
        <Button onClick={() => handleSizeSelect(4)}>4x4</Button>
        <Button onClick={() => handleSizeSelect(5)}>5x5</Button>
      </FlexElement>
      <div>
        {state.matches('playing') && !state.context.winner && (
          <p>Current Player: {state.context.currentPlayer}</p>
        )}
        {state.matches('won') && (
          <p>Winner: Player {state.context.winner}</p>
        )}
        {state.matches('draw') && (
          <p>Draw!</p>
        )}
        {!state.matches('playing') && !state.matches('won') && !state.matches('draw') && (
          <p>Select Board size</p>
        )}
      </div>
      <Board>
        {state.context.boardSize > 0 && (
          state.context.board.map((row, rowIndex) => (
            <BoardLine key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Cell key={cellIndex} onClick={() => handleCellClick(rowIndex, cellIndex)}>
                  {cell}
                </Cell>
              ))}
            </BoardLine>
          ))
        )}
      </Board>
    </Card>
  );
};
