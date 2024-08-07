import { createActor } from 'xstate';
import { stateMachine } from './index'; // Adjust this path if necessary

describe('stateMachine', () => {
  let actor;

  beforeEach(() => {
    actor = createActor(stateMachine);
    actor.start();
  });

  test('should start in idle state', () => {
    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('idle');
  });

  test('should transition to playing on SELECT_SIZE', () => {
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('playing');
    expect(snapshot.context.boardSize).toBe(3);
  });

  test('should add X mark and switch player', () => {
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 0 });
    const snapshot = actor.getSnapshot();
    expect(snapshot.context.board[0][0]).toBe('X');
    expect(snapshot.context.currentPlayer).toBe('O');
  });

  test('should add O mark and switch player', () => {
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 0 });
    actor.send({ type: 'CIRCLE', rowIndex: 1, cellIndex: 1 });
    const snapshot = actor.getSnapshot();
    expect(snapshot.context.board[1][1]).toBe('O');
    expect(snapshot.context.currentPlayer).toBe('X');
  });

  test('should transition to won state when there is a winner', () => {
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 0 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 1 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 2 });
    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('won');
    expect(snapshot.context.winner).toBe('X');
  });

  test('should transition to draw state when the board is full and there is no winner', () => {
    
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 0 });
    actor.send({ type: 'CIRCLE', rowIndex: 0, cellIndex: 1 });
    actor.send({ type: 'XMARK', rowIndex: 0, cellIndex: 2 });
    actor.send({ type: 'CIRCLE', rowIndex: 1, cellIndex: 0 });
    actor.send({ type: 'XMARK', rowIndex: 1, cellIndex: 1 });
    actor.send({ type: 'XMARK', rowIndex: 1, cellIndex: 2 });
    actor.send({ type: 'CIRCLE', rowIndex: 2, cellIndex: 0 });
    actor.send({ type: 'XMARK', rowIndex: 2, cellIndex: 1 });
    actor.send({ type: 'CIRCLE', rowIndex: 2, cellIndex: 2 });
    
    const snapshot = actor.getSnapshot();

    expect(snapshot.context.winner).toBe(null);
    expect(snapshot.value).toBe('draw');
  });

  test('should reset the game on RESET', () => {
    actor.send({ type: 'SELECT_SIZE', size: 3 });
    actor.send({ type: 'RESET' });
    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('idle');
    expect(snapshot.context.boardSize).toBe(0);
  });
});
