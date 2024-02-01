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
  
  return (
    <>
      {
        winner !== 'none' &&
        <h1>Winner is {winner}</h1>
      }
      {
        board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {
              row.map((col, colIndex) => (
                <Square key={colIndex} value={col} row={rowIndex} col={colIndex} cb={move} />
              ))
            }
          </div>
        ))
      }
      <button type="button" onClick={ () => reset() }>Reset</button>
    </>
  );
}
