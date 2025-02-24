
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { CITIES } from "../constants/gameData";
import { MarketPlace } from "../components/game/MarketPlace";

const Market = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Market</h1>
          <Link
            to={`/city/${currentCity.id}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to City
          </Link>
        </div>
        <MarketPlace />
      </div>
    </div>
  );
};

export default Market;
