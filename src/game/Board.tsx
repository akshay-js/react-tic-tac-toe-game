import { useState } from "react";
import Square from "./Square";
import BoardService from "./services/BoardService";

export default function Board() {
  const [board, setBoard] = useState<string[][]>(BoardService.board);
  const [winner, setWinner] = useState<string>(BoardService.getWinner());

  const move = (row: number, col: number): void => {
    BoardService.move(row, col);
    setBoard([...BoardService.board]);
    setWinner(BoardService.getWinner());
  };

  const reset = (): void => {
    BoardService.reset();
    setBoard([...BoardService.board]);
    setWinner(BoardService.getWinner());
  };

  const isDraw = (): boolean => {
    return BoardService.board.every(row => row.every(cell => cell !== '-')) && winner === 'none';
  };

  return (
    <div className="board-container">
      <h1 className="title">Tic Tac Toe</h1>
      {winner !== 'none' && <h2 className="winner-message">Winner is {winner}</h2>}
      {isDraw() && <h2 className="draw-message">It's a Draw!</h2>}

      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Square key={colIndex} value={col} row={rowIndex} col={colIndex} cb={move} />
            ))}
          </div>
        ))}
      </div>

      <button type="button" className="reset-button" onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
}
