
import { MapPin, DollarSign, AlertCircle } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";

export const GameHeader = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Current Location</div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span className="text-xl font-semibold">{currentCity.name}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Your Money</div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-game-success" />
          <span className="text-xl font-semibold">{formatMoney(state.money)}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Heat Level</div>
        <div className="flex items-center space-x-2">
          <AlertCircle
            className={`w-5 h-5 ${
              state.heat > 70 ? "text-game-risk animate-risk-pulse" : ""
            }`}
          />
          <span className="text-xl font-semibold">{state.heat}%</span>
        </div>
      </div>
    </div>
  );
};
