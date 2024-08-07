import { checkWinner } from './index';

describe('checkWinner', () => {
  test('should return X for horizontal win', () => {
    const board = [
      ['X', 'X', 'X', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    expect(checkWinner(board)).toBe('X');
  });

  test('should return O for vertical win', () => {
    const board = [
      ['O', '', '', '', ''],
      ['O', '', '', '', ''],
      ['O', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    expect(checkWinner(board)).toBe('O');
  });

  test('should return X for diagonal win', () => {
    const board = [
      ['X', '', '', '', ''],
      ['', 'X', '', '', ''],
      ['', '', 'X', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    expect(checkWinner(board)).toBe('X');
  });

  test('should return O for reverse diagonal win', () => {
    const board = [
      ['', '', '', 'O', ''],
      ['', '', 'O', '', ''],
      ['', 'O', '', '', ''],
      ['O', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    expect(checkWinner(board)).toBe('O');
  });

  test('should return null if no winner', () => {
    const board = [
      ['X', 'O', 'X', '', ''],
      ['O', 'X', 'O', '', ''],
      ['O', 'X', 'O', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    expect(checkWinner(board)).toBe(null);
  });
});
