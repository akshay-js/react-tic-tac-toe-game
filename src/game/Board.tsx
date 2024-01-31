import { useState } from "react";
import Square from "./Square";
import { PlayerClass } from "./services/BoardService";
import BoardService from "./services/BoardService";

export default function Board() {
  const [player, setPlayer] = useState(PlayerClass.getOpponent());

  const move = (row: number, col: number) => {
    BoardService.move(row, col);
    setPlayer(PlayerClass.getOpponent());
  };

  const boardObj = BoardService.board;
  return (
    <>
      {
        BoardService.isOver() &&
        <h1>Winner is {PlayerClass.getWinner()}</h1>
      }
      {
        boardObj.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {
              row.map((col, colIndex) => (
                <Square key={colIndex} value={col} row={rowIndex} col={colIndex} cb={move} />
              ))
            }
          </div>
        ))
      }
    </>
  );
}
