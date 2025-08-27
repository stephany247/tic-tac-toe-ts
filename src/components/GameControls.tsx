import { useGameStore } from "@/store";
import { Button } from "@/components/ui/button";
import { RotateCcw, History } from "lucide-react";
import GameModeSelector from "./GameModeSelector";

const GameControls = ({ status }: { status: string }) => {
  const history = useGameStore((state) => state.history);
  const resetGame = useGameStore((state) => state.resetGame);

  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // Determine text color based on status
  const statusColor = status.includes("Winner")
    ? "text-green-600 dark:text-green-400"
    : status.includes("Draw")
    ? "text-orange-400"
    : "text-muted-foreground"; // next player

  return (
    <div className="space-y-6">
      {/* Game Mode Selector */}
      <GameModeSelector />

      {/* Game Status */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Tic Tac Toe</h2>
        <p className={`text-lg font-semibold ${statusColor}`}>{status}</p>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={resetGame}
        >
          <RotateCcw className="h-4 w-4" />
          New Game
        </Button>
      </div>

      {/* Time Travel History */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <History className="h-4 w-4" />
          Game History
        </div>

        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {history.map((_, step) => {
            const isActive = step === currentMove;
            const description =
              step === 0 ? "Go to game start" : `Go to move #${step}`;

            return (
              <Button
                key={step}
                variant={isActive ? "default" : "outline"}
                onClick={() => jumpTo(step)}
                // className={cn("history-button", isActive && "active")}
                className={`cursor-pointer ${
                  isActive ? "bg-primary text-primary-foreground" : ""
                }`}
                title={description}
              >
                {step === 0 ? "Start" : step}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameControls;
