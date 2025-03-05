
import { MapPin, DollarSign, AlertCircle, Zap } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";
import { Progress } from "../ui/progress";

export const FloatingStatusBar = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  
  // Calculate percentage of energy remaining
  const energyPercentage = state.playerStats 
    ? (state.playerStats.energy / state.playerStats.maxEnergy) * 100
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-background/80 backdrop-blur-md border-t border-border/50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-game-accent" />
            <span className="text-sm font-medium">{currentCity.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-game-success" />
            <span className="text-sm font-medium">{formatMoney(state.money)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex flex-col gap-1 min-w-28">
            <div className="flex items-center justify-between">
              <span className="text-xs">Energy</span>
              <span className="text-xs text-muted-foreground">
                {state.playerStats?.energy}/{state.playerStats?.maxEnergy}
              </span>
            </div>
            <Progress value={energyPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <AlertCircle
              className={`w-4 h-4 ${
                state.heat > 70 ? "text-game-risk animate-risk-pulse" : "text-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium">{state.heat}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-game-accent" />
            <span className="text-sm font-medium">Level {state.playerStats?.level || 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
