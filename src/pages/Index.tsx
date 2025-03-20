
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trophy, Map, Dumbbell, Store, Shield } from "lucide-react";
import { MarketPlace } from "../components/game/MarketPlace";
import { TravelOptions } from "../components/game/TravelOptions";
import { PlayerStatsPanel } from "../components/game/PlayerStatsPanel";
import { useGame } from "../context/GameContext";
import { GameOver } from "../components/game/GameOver";
import { VehicleDisplay } from "../components/game/VehicleDisplay";
import { GameHeader } from "../components/game/GameHeader";
import { Inventory } from "../components/game/Inventory";
import { ConsumablesInventory } from "../components/game/ConsumablesInventory";
import { PoliceEncounterModal } from "../components/game/PoliceEncounterModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { CrimesList } from "../components/game/crimes/CrimesList";

const Index = () => {
  const { state, dispatch } = useGame();

  // Game over state
  if (state.gameOver) {
    return <GameOver finalScore={state.money} />;
  }
  
  // Regenerate nerve when visiting crimes tab
  const handleCrimesTabSelect = () => {
    dispatch({ type: "REGENERATE_NERVE" });
  };

  return (
    <div className="container mx-auto p-2 space-y-3">
      <GameHeader />
      <PoliceEncounterModal />

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid grid-cols-4 mb-2">
          <TabsTrigger value="market" className="flex items-center gap-1 text-xs py-1">
            <ShoppingBag className="w-3 h-3" />
            <span>Drug Market</span>
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex items-center gap-1 text-xs py-1">
            <Map className="w-3 h-3" />
            <span>Travel</span>
          </TabsTrigger>
          <TabsTrigger value="crimes" className="flex items-center gap-1 text-xs py-1" onClick={handleCrimesTabSelect}>
            <Shield className="w-3 h-3" />
            <span>Crimes</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-1 text-xs py-1">
            <Store className="w-3 h-3" />
            <span>Vehicle Shop</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left column - Player stats & inventory (always visible) */}
          <div className="space-y-3">
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
            
            <TabsContent value="crimes" className="mt-0">
              <CrimesList 
                crimes={state.availableCrimes}
                playerNerve={state.playerStats.nerve}
                playerLevel={state.playerStats.level}
                currentCity={state.currentCity}
                onCommitCrime={(crimeId) => dispatch({ type: "COMMIT_CRIME", crimeId })}
              />
            </TabsContent>
            
            <TabsContent value="store" className="mt-0 space-y-3">
              <VehicleDisplay />
              <div className="pt-2">
                <Button
                  asChild
                  className="inline-flex items-center justify-center gap-1 p-2 text-xs"
                >
                  <Link to="/shop">
                    <ShoppingBag className="w-3 h-3" />
                    <span>Full Shop</span>
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
      {/* Quick links */}
      <div className="grid grid-cols-4 gap-2">
        <Button
          asChild
          variant="default"
          className="flex items-center justify-center gap-1 p-1.5 text-xs"
        >
          <Link to="/shop">
            <ShoppingBag className="w-3 h-3" />
            <span>Shop</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          className="flex items-center justify-center gap-1 p-1.5 text-xs"
        >
          <Link to="/achievements">
            <Trophy className="w-3 h-3" />
            <span>Achievements</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          className="flex items-center justify-center gap-1 p-1.5 text-xs"
        >
          <Link to="/explore">
            <Map className="w-3 h-3" />
            <span>Explore</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          className="flex items-center justify-center gap-1 p-1.5 text-xs"
        >
          <Link to="/gym">
            <Dumbbell className="w-3 h-3" />
            <span>Gym</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
