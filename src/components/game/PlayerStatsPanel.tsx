
import { Wallet, Heart, Shield, Zap, Clock } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { useGameTime } from "../../hooks/useGameTime";
import { formatMoney } from "../../utils/gameUtils";
import { CITIES } from "../../constants/gameData";

export const PlayerStatsPanel = () => {
  const { state } = useGame();
  const { timeOfDay } = useGameTime();
  
  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'dawn':
        return '🌅';
      case 'day':
        return '☀️';
      case 'dusk':
        return '🌆';
      case 'night':
        return '🌙';
    }
  };
  
  return (
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Money */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="font-semibold">Money</span>
          </div>
          <p className="text-xl font-bold text-game-success">{formatMoney(state.money)}</p>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">Time</span>
          </div>
          <p className="text-xl">
            {getTimeIcon()} Day {state.dayCount}
          </p>
        </div>

        {/* Wanted Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${state.wantedLevel > 3 ? "text-game-risk" : "text-primary"}`} />
            <span className="font-semibold">Wanted Level</span>
          </div>
          <p className="text-xl font-bold">{"★".repeat(state.wantedLevel)}</p>
        </div>

        {/* Heat */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${state.heat > 75 ? "text-game-risk" : "text-primary"}`} />
            <span className="font-semibold">Heat</span>
          </div>
          <p className="text-xl font-bold">{state.heat}%</p>
        </div>

        {/* Active Abilities */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-semibold">Active Abilities</span>
          </div>
          <p className="text-sm">
            {state.abilities.filter(a => a.unlocked).length} / {state.abilities.length}
          </p>
        </div>
      </div>

      {/* City Reputations */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground">City Reputations</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {state.reputations.map((rep) => {
            const city = CITIES.find(c => c.id === rep.cityId)!;
            const isInvestigating = state.policeActivity.find(
              p => p.cityId === rep.cityId
            )?.isInvestigating;

            return (
              <div
                key={rep.cityId}
                className={`p-2 rounded-md border ${
                  isInvestigating ? "border-game-risk/50 bg-game-risk/10" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{city.name}</span>
                  <span
                    className={`text-sm ${
                      rep.level > 0
                        ? "text-game-success"
                        : rep.level < 0
                        ? "text-game-risk"
                        : "text-muted-foreground"
                    }`}
                  >
                    {rep.level > 0 ? "+" : ""}{rep.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Abilities List */}
      {state.abilities.filter(a => a.unlocked).length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-muted-foreground">Active Abilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {state.abilities.filter(a => a.unlocked).map((ability) => (
              <div key={ability.id} className="p-2 rounded-md border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{ability.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {(ability.magnitude * 100).toFixed(0)}% {ability.effect.toLowerCase().replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
