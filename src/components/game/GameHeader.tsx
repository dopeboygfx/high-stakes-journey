
import { MapPin, DollarSign, AlertCircle } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";

export const GameHeader = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  return (
    <div className="grid grid-cols-3 gap-4 p-4 formal-panel">
      <div className="flex flex-col items-center justify-center space-y-1 p-2">
        <div className="text-xs text-muted-foreground">Location</div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span className="text-base font-semibold">{currentCity.name}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-1 p-2 border-x">
        <div className="text-xs text-muted-foreground">Money</div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-game-success" />
          <span className="text-base font-semibold">{formatMoney(state.money)}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-1 p-2">
        <div className="text-xs text-muted-foreground">Heat</div>
        <div className="flex items-center space-x-1">
          <AlertCircle
            className={`w-4 h-4 ${
              state.heat > 70 ? "text-game-risk animate-risk-pulse" : ""
            }`}
          />
          <span className="text-base font-semibold">{state.heat}%</span>
        </div>
      </div>
    </div>
  );
};
