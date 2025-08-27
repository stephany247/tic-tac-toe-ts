import { Button } from "./ui/button";

type SquareProps = {
  value: "X" | "O" | null;
  onSquareClick: () => void;
  disabled?: boolean;
  winner?: boolean;
};
export default function Square({
  value,
  onSquareClick,
  disabled,
  winner,
}: SquareProps) {
  return (
    <Button
      variant="secondary"
      className={`w-full h-full aspect-square flex items-center justify-center p-0 border rounded-sm font-bold text-4xl cursor-pointer hover:scale-104 hover:border-accent-foreground transition-transform duration-300 ease-in-out disabled:opacity-100 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:scale-100 disabled:hover:border-border ${
        value === "X" ? "text-foreground" : "text-destructive"
      } ${winner ? "winning" : ""}`}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </Button>
  );
}
