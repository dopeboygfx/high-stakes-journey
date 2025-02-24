
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "../components/game/GameHeader";
import { MarketPlace } from "../components/game/MarketPlace";
import { TravelOptions } from "../components/game/TravelOptions";
import { AbilitiesPanel } from "../components/game/AbilitiesPanel";
import { VehicleDisplay } from "../components/game/VehicleDisplay";
import { GameOver } from "../components/game/GameOver";
import { Inventory } from "../components/game/Inventory";
import { PlayerStatsPanel } from "../components/game/PlayerStatsPanel";
import { useGame } from "../context/GameContext";

const Index = () => {
  const { state } = useGame();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"market" | "travel">("market");

  if (state.gameOver && state.finalScore !== undefined) {
    return <GameOver finalScore={state.finalScore} />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <GameHeader />
      <PlayerStatsPanel />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("market")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "market"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setActiveTab("travel")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "travel"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              Travel
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="px-4 py-2 rounded-lg hover:bg-accent transition-colors ml-auto"
            >
              Shop
            </button>
          </div>
          {activeTab === "market" ? <MarketPlace /> : <TravelOptions />}
        </div>
        <div className="space-y-6">
          <VehicleDisplay />
          <Inventory />
          <AbilitiesPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
