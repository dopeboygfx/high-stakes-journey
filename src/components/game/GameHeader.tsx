
import { MapPin, DollarSign, AlertCircle, Bell } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";
import { Progress } from "../ui/progress";

export const GameHeader = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-secondary p-3 border-b border-border/60">
        <h1 className="text-2xl font-bold">HOME</h1>
        <div className="flex items-center gap-2">
          <div className="bg-destructive text-white text-sm rounded-full px-2 py-0.5 flex items-center">
            <span>99+</span>
            <Bell className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 bg-secondary/80">
        {/* Health Bar */}
        <div className="border-r border-border/40 p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-[#ff3b3b] flex items-center justify-center">
              ❤️
            </div>
            <span className="text-sm font-medium">
              {state.playerStats.energy}/{state.playerStats.maxEnergy}
            </span>
          </div>
          <div className="stat-bar">
            <div 
              className="stat-value bg-[#ff3b3b]" 
              style={{ width: `${(state.playerStats.energy / state.playerStats.maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Energy Bar */}
        <div className="border-r border-border/40 p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-[#ffee00] flex items-center justify-center">
              ⚡
            </div>
            <span className="text-sm font-medium">
              {state.playerStats.energy}/{state.playerStats.maxEnergy}
            </span>
          </div>
          <div className="stat-bar">
            <div 
              className="stat-value bg-[#ffee00]" 
              style={{ width: `${(state.playerStats.energy / state.playerStats.maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Attack Bar */}
        <div className="border-r border-border/40 p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-[#ff7b00] flex items-center justify-center">
              🔫
            </div>
            <span className="text-sm font-medium">
              {state.playerStats.strength}/{state.playerStats.strength}
            </span>
          </div>
          <div className="stat-bar">
            <div 
              className="stat-value bg-[#ff7b00]" 
              style={{ width: `100%` }}
            ></div>
          </div>
        </div>

        {/* Money */}
        <div className="p-2">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">{formatMoney(state.money)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-amber-500 text-xs flex items-center justify-center">$</div>
              <span className="text-sm">{state.playerStats.level * 100}</span>
            </div>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="bg-secondary/60 px-3 py-2 flex items-center gap-3">
        <span className="text-sm font-medium">Lv: {state.playerStats.level}</span>
        <div className="stat-bar flex-1">
          <div 
            className="stat-value bg-[#4CAF50]" 
            style={{ width: `${(state.playerStats.exp / state.playerStats.expToNextLevel) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs">{state.playerStats.exp}/{state.playerStats.expToNextLevel}XP</span>
      </div>
    </div>
  );
};
