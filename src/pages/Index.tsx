
import React from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, Trophy, Map, Dumbbell, Shield, Users, Bell, MoreHorizontal } from "lucide-react";
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
import { PropertiesPanel } from "../components/game/PropertiesPanel";
import { StockpilePanel } from "../components/game/StockpilePanel";
import { MobPanel } from "../components/game/MobPanel";
import { ChallengesPanel } from "../components/game/ChallengesPanel";

const Index = () => {
  const { state } = useGame();

  // Game over state
  if (state.gameOver) {
    return <GameOver finalScore={state.money} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <PoliceEncounterModal />

      <div className="container mx-auto p-4 space-y-4">
        <PlayerStatsPanel />
        <PropertiesPanel />
        <StockpilePanel />
        <MobPanel />
        <ChallengesPanel />
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border flex justify-between">
        <Link to="/" className="flex-1 flex flex-col items-center justify-center py-2 text-primary">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/shop" className="flex-1 flex flex-col items-center justify-center py-2">
          <Bell className="w-5 h-5" />
          <span className="text-xs">News</span>
        </Link>
        <Link to="/achievements" className="flex-1 flex flex-col items-center justify-center py-2 text-primary">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs">Shop</span>
        </Link>
        <Link to="/explore" className="flex-1 flex flex-col items-center justify-center py-2">
          <Users className="w-5 h-5" />
          <span className="text-xs">Mob</span>
        </Link>
        <Link to="/gym" className="flex-1 flex flex-col items-center justify-center py-2">
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs">More</span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
