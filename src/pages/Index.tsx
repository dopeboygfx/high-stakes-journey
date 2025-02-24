
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { GameHeader } from "../components/game/GameHeader";
import { MarketPlace } from "../components/game/MarketPlace";
import { TravelOptions } from "../components/game/TravelOptions";
import { Inventory } from "../components/game/Inventory";
import { GameOver } from "../components/game/GameOver";

const Index = () => {
  const { state } = useGame();

  useEffect(() => {
    if (state.gameOver) {
      toast.error("Game Over! You got caught!");
    }
  }, [state.gameOver]);

  if (state.gameOver) {
    return <GameOver finalScore={state.money} />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <GameHeader />
        <div className="flex justify-end">
          <Link
            to={`/city/${state.currentCity}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Enter City
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MarketPlace />
          <TravelOptions />
        </div>
        <Inventory />
      </div>
    </div>
  );
};

export default Index;
