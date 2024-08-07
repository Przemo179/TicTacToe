export const checkWinner = (board) => {
  const size = board.length;
  const winLength = 3;

  const checkLine = (line) => {
    for (let i = 0; i <= line.length - winLength; i++) {
      const segment = line.slice(i, i + winLength);
      if (segment.every(cell => cell === segment[0] && cell !== '')) {
        return segment[0];
      }
    }
    return null;
  };

  for (let row = 0; row < size; row++) {
    const rowWinner = checkLine(board[row]);
    if (rowWinner) {
      return rowWinner;
    }
  }

  for (let col = 0; col < size; col++) {
    const column = board.map(row => row[col]);
    const colWinner = checkLine(column);
    if (colWinner) {
      return colWinner;
    }
  }

  for (let startRow = 0; startRow <= size - winLength; startRow++) {
    for (let startCol = 0; startCol <= size - winLength; startCol++) {
      const diagonal = [];
      for (let i = 0; i < winLength; i++) {
        diagonal.push(board[startRow + i][startCol + i]);
      }
      const diagWinner = checkLine(diagonal);
      if (diagWinner) {
        return diagWinner;
      }
    }
  }

  for (let startRow = 0; startRow <= size - winLength; startRow++) {
    for (let startCol = winLength - 1; startCol < size; startCol++) {
      const diagonal = [];
      for (let i = 0; i < winLength; i++) {
        diagonal.push(board[startRow + i][startCol - i]);
      }
      const diagWinner = checkLine(diagonal);
      if (diagWinner) {
        return diagWinner;
      }
    }
  }

  return null;
};