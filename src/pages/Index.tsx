import Board from "@/components/Board";
import GameControls from "@/components/GameControls";
import ThemeToggle from "@/components/ThemeToggle";
import { useGameStore, type SquareValue } from "@/store";
import { useEffect } from "react";

function Index() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);

  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const currentMove = useGameStore((state) => state.currentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const { gameMode, humanPlayer } = useGameStore();

  const player = xIsNext ? "X" : "O";
  const winner = calculateWinner(currentSquares);
  const turns = calculateTurns(currentSquares);
  const status = calculateStatus(winner, turns, player);

  function calculateWinner(squares: Array<"X" | "O" | null>) {
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
        return squares[a];
      }
    }

    return null;
  }

  function calculateTurns(squares: Array<"X" | "O" | null>) {
    return squares.filter((square) => !square).length;
  }

  function calculateStatus(
    winner: "X" | "O" | null,
    turns: number,
    player: "X" | "O"
  ) {
    if (!winner && !turns) return "It's a Draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${player}`;
  }

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function getComputerMove(squares: SquareValue[]): number | null {
    const emptySquares = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null) as number[];
    if (emptySquares.length === 0) return null;
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  useEffect(() => {
    if (
      gameMode === "human-vs-computer" &&
      !winner &&
      ((xIsNext && humanPlayer !== "X") || (!xIsNext && humanPlayer !== "O"))
    ) {
      const move = getComputerMove(currentSquares);
      if (move !== null) {
        setTimeout(() => {
          const nextSquares = currentSquares.slice();
          nextSquares[move] = xIsNext ? "X" : "O";
          handlePlay(nextSquares);
        }, 500); // slight delay for realism
      }
    }
  }, [gameMode, humanPlayer, xIsNext, currentSquares, winner]);

  return (
    <div>
      {/* <Board /> */}
      <div className="min-h-screen bg-background relative">
        {/* <Confetti /> */}

        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
          <ThemeToggle />
        </header>

        {/* Main Game Area */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <GameControls status={status} />
            {/* <GameBoard /> */}
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
