
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trophy, Map, Dumbbell, Shield } from "lucide-react";
import { MarketPlace } from "../components/game/MarketPlace";
import { TravelOptions } from "../components/game/TravelOptions";
import { PlayerStatsPanel } from "../components/game/PlayerStatsPanel";
import { AbilitiesPanel } from "../components/game/AbilitiesPanel";
import { useGame } from "../context/GameContext";
import { GameOver } from "../components/game/GameOver";
import { VehicleDisplay } from "../components/game/VehicleDisplay";
import { GameHeader } from "../components/game/GameHeader";
import { Inventory } from "../components/game/Inventory";
import { ConsumablesInventory } from "../components/game/ConsumablesInventory";
import { PoliceEncounterModal } from "../components/game/PoliceEncounterModal";

const Index = () => {
  const { state } = useGame();

  // Game over state
  if (state.gameOver) {
    return <GameOver finalScore={state.money} />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <GameHeader />
      <PoliceEncounterModal />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Player stats & inventory */}
        <div className="space-y-4">
          <PlayerStatsPanel />
          <ConsumablesInventory />
          <Inventory />
        </div>

        {/* Middle column - Market */}
        <div className="space-y-6">
          <MarketPlace />
          <VehicleDisplay />
        </div>

        {/* Right column - Travel & Abilities */}
        <div className="space-y-6">
          <TravelOptions />
          <AbilitiesPanel />

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </Link>
            <Link
              to="/achievements"
              className="flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </Link>
            <Link
              to="/explore"
              className="flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Map className="w-4 h-4" />
              <span>Explore</span>
            </Link>
            <Link
              to="/gym"
              className="flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Gym</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
