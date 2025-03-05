
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trophy, Map, Dumbbell, Shield, Store, Sparkles } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

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

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="market" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Drug Market</span>
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            <span>Travel</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span>Vehicle Shop</span>
          </TabsTrigger>
          <TabsTrigger value="abilities" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Abilities</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Player stats & inventory (always visible) */}
          <div className="space-y-4">
            <PlayerStatsPanel />
            <ConsumablesInventory />
            <Inventory />
          </div>
          
          {/* Middle and right columns - Tabbed content */}
          <div className="lg:col-span-2">
            <TabsContent value="market" className="mt-0">
              <MarketPlace />
            </TabsContent>
            
            <TabsContent value="travel" className="mt-0">
              <TravelOptions />
            </TabsContent>
            
            <TabsContent value="store" className="mt-0 space-y-6">
              <VehicleDisplay />
              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Full Shop</span>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="abilities" className="mt-0">
              <AbilitiesPanel />
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
      {/* Quick links */}
      <div className="grid grid-cols-4 gap-3">
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
  );
};

export default Index;
