
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { GameHeader } from "../components/game/GameHeader";
import { MarketPlace } from "../components/game/MarketPlace";
import { TravelOptions } from "../components/game/TravelOptions";
import { VehicleDisplay } from "../components/game/VehicleDisplay";
import { Inventory } from "../components/game/Inventory";
import { AbilitiesPanel } from "../components/game/AbilitiesPanel";
import { GameOver } from "../components/game/GameOver";
import { PlayerStatsPanel } from "../components/game/PlayerStatsPanel";
import { Users, Dumbbell, ShoppingBag, Trophy, PoliceIcon } from "lucide-react";
import { PoliceEncounterModal } from "../components/game/PoliceEncounterModal";

const Index = () => {
  const { state } = useGame();

  useEffect(() => {
    if (state.gameOver) {
      toast.error("Game Over! You got caught!");
    }
  }, [state.gameOver]);

  if (state.gameOver) {
    return <GameOver finalScore={state.money} />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <GameHeader />
        
        <div className="flex flex-wrap gap-4 mb-4">
          <Link 
            to="/explore" 
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Users className="mr-2 h-4 w-4" />
            Explore City
          </Link>
          
          <Link 
            to="/gym" 
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            Visit Gym
          </Link>
          
          <Link 
            to="/shop" 
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop
          </Link>
          
          <Link 
            to="/achievements" 
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Achievements
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MarketPlace />
          <VehicleDisplay />
          <TravelOptions />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Inventory />
          <div className="space-y-8">
            <PlayerStatsPanel />
            <AbilitiesPanel />
          </div>
        </div>
      </div>
      
      {/* Police Encounter Modal */}
      {state.activePoliceEncounter && <PoliceEncounterModal />}
    </div>
  );
};

export default Index;
