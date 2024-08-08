import { useMachine } from '@xstate/react';
import { Card, Cell, Board, BoardLine } from './styles';
import { Header } from "./Header";
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

  const handleReset = () => {
    send({ type: 'RESET' })
  };

  const MACHINE_STATE_PLAYING = state.matches('playing');
  const MACHINE_STATE_WON = state.matches('won');
  const MACHINE_STATE_DRAW = state.matches('draw');

  return (
    <Card>
      <Header 
        reset={handleReset}
        handleSizeSelect={(size) => handleSizeSelect(size)}
      />
      <div>
        {MACHINE_STATE_PLAYING && !state.context.winner && (
          <p>Current Player: {state.context.currentPlayer}</p>
        )}
        {MACHINE_STATE_WON && (
          <p>Winner: Player {state.context.winner}</p>
        )}
        {MACHINE_STATE_DRAW && (
          <p>Draw!</p>
        )}
        {!MACHINE_STATE_PLAYING && !MACHINE_STATE_WON && !MACHINE_STATE_DRAW && (
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
