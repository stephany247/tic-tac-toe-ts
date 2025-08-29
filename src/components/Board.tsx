import { calculateWinner } from "@/utils/game";
import Square from "./Square";
import type { HumanPlayer, SquareValue } from "@/store/store";

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const player: HumanPlayer = xIsNext ? "X" : "O";
  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line || [];

  function handleClick(i: number): void {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  return (
    <section className="w-full h-full max-w-sm mx-auto grid grid-cols-3 grid-rows-3 gap-2 rounded-lg border p-4 shadow-lg">
      {squares.map((square, squareIndex) => (
        <Square
          key={squareIndex}
          value={square}
          onSquareClick={() => handleClick(squareIndex)}
          disabled={Boolean(square) || Boolean(winner)}
          winner={winningLine.includes(squareIndex)}
        />
      ))}
    </section>
  );
}
