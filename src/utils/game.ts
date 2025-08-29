import {
  useGameStore,
  type HumanPlayer,
  type SquareValue,
} from "@/store/store";
const { history, currentMove, gameMode, isThinking } = useGameStore();
const { setHistory, setCurrentMove } = useGameStore();

type WinnerResult = {
  winner: HumanPlayer;
  line: number[];
};

export function calculateWinner(squares: SquareValue[]): WinnerResult | null {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return squares[a];
      // return both winner and the winning indices
      return { winner: squares[a] as HumanPlayer, line: [a, b, c] };
    }
  }

  return null;
}

export function calculateTurns(squares: SquareValue[]): number {
  return squares.filter((square) => !square).length;
}

export function calculateStatus(
  winner: SquareValue,
  turns: number,
  player: HumanPlayer
) {
  if (!winner && !turns) return "It's a Draw!";
  if (winner) return `Winner: ${winner}`;
  if (isThinking) {
    return gameMode === "human-vs-computer"
      ? "Computer thinking..."
      : "AI thinking...";
  }
  return `Next player: ${player}`;
}

export function handlePlay(nextSquares: SquareValue[]) {
  const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
}

export function isDraw(squares: SquareValue[]) {
  return squares.every((sq) => sq !== null) && !calculateWinner(squares);
}

export function getComputerMove(squares: SquareValue[]): number | null {
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((idx) => idx !== null) as number[];
  if (emptySquares.length === 0) return null;
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

export function minimax(
  squares: SquareValue[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: SquareValue,
  humanPlayer: SquareValue
): number {
  const winner = calculateWinner(squares);

  // Base cases
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isDraw(squares)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = aiPlayer;
        const score = minimax(squares, depth + 1, false, aiPlayer, humanPlayer);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = humanPlayer;
        const score = minimax(squares, depth + 1, true, aiPlayer, humanPlayer);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function getAIMove(
  squares: SquareValue[],
  humanPlayer: HumanPlayer
): number {
  const aiPlayer = humanPlayer === "X" ? "O" : "X";
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = aiPlayer;
      const score = minimax(squares, 0, false, aiPlayer, humanPlayer);
      squares[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}
