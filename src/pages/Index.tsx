import Board from "@/components/Board";
import GameControls from "@/components/GameControls";
import ThemeToggle from "@/components/ThemeToggle";
import { useGameStore } from "@/store/store";
import {
  calculateStatus,
  calculateTurns,
  calculateWinner,
  getAIMove,
  getComputerMove,
  handlePlay,
} from "@/utils/game";
import { useEffect, useMemo } from "react";

function Index() {
  const {
    history,
    currentMove,
    gameMode,
    humanPlayer,
    isThinking,
    setHistory,
    setCurrentMove,
    setThinking,
  } = useGameStore();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const player = xIsNext ? "X" : "O";
  // const winner = calculateWinner(currentSquares);
  const result = calculateWinner(currentSquares);
  const winner = result?.winner ?? null;
  const turns = useMemo(() => calculateTurns(currentSquares), [currentSquares]);
  // const turns = calculateTurns(currentSquares);
  const status = calculateStatus(winner, turns, player, isThinking, gameMode);

  const play = (nextSquares: typeof currentSquares) => {
    handlePlay(nextSquares, history, currentMove, setHistory, setCurrentMove);
  };

  useEffect(() => {
    const isAITurn =
      (xIsNext && humanPlayer !== "X") || (!xIsNext && humanPlayer !== "O");
    if (
      // gameMode === "human-vs-computer" &&
      // !winner &&
      // ((xIsNext && humanPlayer !== "X") || (!xIsNext && humanPlayer !== "O"))
      (gameMode === "human-vs-computer" || gameMode === "human-vs-ai") &&
      !winner &&
      isAITurn
    ) {
      setThinking(true);
      // const move = getComputerMove(currentSquares);
      const move =
        gameMode === "human-vs-ai"
          ? getAIMove([...currentSquares], humanPlayer)
          : getComputerMove(currentSquares);
      if (move !== null) {
        setTimeout(
          () => {
            const nextSquares = currentSquares.slice();
            nextSquares[move] = xIsNext ? "X" : "O";
            handlePlay(
              nextSquares,
              history,
              currentMove,
              setHistory,
              setCurrentMove
            );
            setThinking(false);
          },
          gameMode === "human-vs-ai" ? 700 : 500
        ); // slight delay for realism
      }
    }
  }, [gameMode, humanPlayer, xIsNext, currentSquares, winner, setThinking]);

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
              onPlay={play}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
