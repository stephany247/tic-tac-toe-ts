import { create } from "zustand";
import { combine } from "zustand/middleware";

// Types
export type SquareValue = "X" | "O" | null;
type BoardState = SquareValue[];
type History = BoardState[];
export type GameMode = "human-vs-human" | "human-vs-computer" | "human-vs-ai";
export type HumanPlayer = "X" | "O";

interface GameState {
  history: History;
  currentMove: number;
  gameMode: GameMode;
  humanPlayer: HumanPlayer;
  isThinking: boolean;
}

interface GameActions {
  setHistory: (nextHistory: History | ((history: History) => History)) => void;
  setCurrentMove: (
    nextCurrentMove: number | ((currentMove: number) => number)
  ) => void;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
  setHumanPlayer: (player: HumanPlayer) => void;
  setThinking: (value: boolean) => void;
}

export const useGameStore = create(
  combine<GameState, GameActions>(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
      gameMode: "human-vs-human",
      humanPlayer: "X", // default
      isThinking: false,
    },
    (set) => {
      return {
        setHistory: (nextHistory) => {
          set((state) => ({
            history:
              typeof nextHistory === "function"
                ? nextHistory(state.history)
                : nextHistory,
          }));
        },
        setCurrentMove: (nextCurrentMove) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === "function"
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }));
        },
        resetGame: () =>
          set({
            history: [Array(9).fill(null)],
            currentMove: 0,
            isThinking: false,
          }),
        setGameMode: (mode) => set({ gameMode: mode }),
        setHumanPlayer: (player) => set({ humanPlayer: player }),
        setThinking: (value: boolean) => set({ isThinking: value }),
      };
    }
  )
);
