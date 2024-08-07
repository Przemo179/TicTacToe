import { createMachine, assign } from 'xstate';
import { checkWinner } from '../utils';

const initialContext = {
  board: [],
  boardSize: 0,
  currentPlayer: 'X',
  winner: null,
  moveCount: 0,
};

export const stateMachine = createMachine({
  id: 'game',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: {
        SELECT_SIZE: {
          target: 'playing',
          actions: 'selectSize',
        },
      },
    },
    playing: {
      on: {
        CIRCLE: {
          actions: 'addCircle',
          target: 'checkStatus'
        },
        XMARK: {
          actions: 'addXmark',
          target: 'checkStatus'
        },
        RESET: {
          actions: 'resetGame',
          target: 'idle',
        },
        SELECT_SIZE: {
          actions: 'selectSize',
        },
      },
    },
    checkStatus: {
      always: [
        {
          target: 'won',
          guard: 'hasWinner',
        },
        {
          target: 'draw',
          guard: 'isDraw',
        },
        {
          target: 'playing',
        },
      ],
    },
    won: {
      on: {
        RESET: {
          actions: 'resetGame',
          target: 'idle',
        },
      },
    },
    draw: {
      on: {
        RESET: {
          actions: 'resetGame',
          target: 'idle',
        },
      },
    },
  },
}, {
  actions: {
    selectSize: assign((context) => {
      const size = context.event.size;
      const newBoard = Array.from({ length: size }, () => Array(size).fill(''));

      return {
        ...context,
        board: newBoard,
        boardSize: size,
        currentPlayer: 'X',
        moveCount: 0,
        winner: null,
      };
    }),
    addCircle: assign((context) => {

      if (context.context.board[context.event.rowIndex][context.event.cellIndex] !== '') {
        return context;
      }
      const newBoard = context.context.board.map((row, rowIndex) => 
        row.map((cell, cellIndex) => 
          rowIndex === context.event.rowIndex && cellIndex === context.event.cellIndex ? 'O' : cell
        )
      );

      return {
        ...context,
        board: newBoard,
        currentPlayer: 'X',
        moveCount: context.context.moveCount + 1,
      };
    }),
    addXmark: assign((context) => {

      if (context.context.board[context.event.rowIndex][context.event.cellIndex] !== '') {
        return context;
      }

      const newBoard = context.context.board.map((row, rowIndex) => 
        row.map((cell, cellIndex) => 
          rowIndex === context.event.rowIndex && cellIndex === context.event.cellIndex ? 'X' : cell
        )
      );

      return {
        ...context,
        board: newBoard,
        currentPlayer: 'O',
        moveCount: context.context.moveCount + 1,
      };
    }),
    resetGame: assign(() => {
      return {
        ...initialContext,
      }
    }),
  },
  guards: {
    hasWinner: (context) => {
      const winner = checkWinner(context.context.board);
      if (winner) {
        context.context.winner = winner;
        return winner;
      }
      return false;
    },
    isDraw: (context) => {
      const size = context.context.boardSize;
      return (context.context.moveCount) === size * size && !context.context.winner;
    },
  },
});