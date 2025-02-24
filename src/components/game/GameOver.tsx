
import { formatMoney } from "../../utils/gameUtils";

interface GameOverProps {
  finalScore: number;
}

export const GameOver = ({ finalScore }: GameOverProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-game-risk">Game Over</h1>
        <p className="text-xl">Final Score: {formatMoney(finalScore)}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-game-accent text-black rounded-md hover:opacity-90 transition-opacity"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
