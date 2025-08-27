import { useGameStore, type GameMode, type HumanPlayer } from "@/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, User, Bot } from "lucide-react";
import { useEffect } from "react";

const GameModeSelector = () => {
  //   const { gameMode, setGameMode } = useGameStore()
  const { gameMode, humanPlayer, setGameMode, setHumanPlayer, resetGame } =
    useGameStore();

  //   const gameMode = useGameStore((state) => state.gameMode);
  //   const setGameMode = useGameStore((state) => state.setGameMode);
  //   const humanPlayer = useGameStore((state) => state.humanPlayer);
  //   const setHumanPlayer = useGameStore((state) => state.setHumanPlayer);

  const modes: {
    value: GameMode;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "human-vs-human",
      label: "Human vs Human",
      description: "Two players take turns",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "human-vs-computer",
      label: "Human vs Computer",
      description: "Play against random computer",
      icon: <User className="h-4 w-4" />,
    },
    {
      value: "human-vs-ai",
      label: "Human vs AI",
      description: "Challenge the unbeatable AI",
      icon: <Bot className="h-4 w-4" />,
    },
  ];

  // Reset the game whenever gameMode or player changes
  useEffect(() => {
    resetGame();
  }, [gameMode, humanPlayer, resetGame]);

  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">Game Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Mode Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Game Mode</Label>
          <RadioGroup
            value={gameMode}
            onValueChange={(value) => {
              setGameMode(value as GameMode);
              resetGame();
            }}
            className="space-y-3"
          >
            {modes.map((mode) => (
              <div key={mode.value} className="flex items-center space-x-3">
                <RadioGroupItem value={mode.value} id={mode.value} />
                <Label
                  htmlFor={mode.value}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  {mode.icon}
                  <div>
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {mode.description}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Player Selection for Computer/AI modes */}
        {(gameMode === "human-vs-computer" || gameMode === "human-vs-ai") && (
          <>
            <Separator className="my-4" />
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Choose Your Player (X always goes first)
              </Label>
              <RadioGroup
                value={humanPlayer}
                onValueChange={(value) => {
                  setHumanPlayer(value as HumanPlayer);
                  resetGame();
                }}
                className="flex gap-6"
              >
                <div className="flex sm:items-center space-x-2">
                  <RadioGroupItem value="X" id="player-x" />
                  <Label
                    htmlFor="player-x"
                    className="cursor-pointer flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-center"
                  >
                    <div className="font-medium">Play as X</div>
                    <div className="text-xs text-muted-foreground">
                      You go first
                    </div>
                  </Label>
                </div>
                <div className="flex items-start justify-start sm:items-center space-x-2">
                  <RadioGroupItem value="O" id="player-o" />
                  <Label
                    htmlFor="player-o"
                    className="cursor-pointer flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-center"
                  >
                    <div className="font-medium">Play as O</div>
                    <div className="text-xs text-muted-foreground">
                      Opponent goes first
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GameModeSelector;
