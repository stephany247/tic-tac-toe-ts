import Square from "./Square";

type Player = "X" | "O";
type SquareValue = Player | null;

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}

interface WinnerResult {
  winner: Player;
  line: number[];
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const player: Player = xIsNext ? "X" : "O";
  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line || [];

  function calculateWinner(squares: SquareValue[]): WinnerResult | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // return squares[a];
        // return both winner and the winning indices
        return { winner: squares[a] as Player, line: [a, b, c] };
      }
    }

    return null;
  }

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
