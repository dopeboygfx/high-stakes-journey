
import React from "react";
import { Shield, Zap, Swords } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

export const PlayerStatsPanel = () => {
  const { state, dispatch } = useGame();
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed") => {
    if (state.playerStats.energy < 1) {
      toast.error("Not enough energy!");
      return;
    }
    
    dispatch({ 
      type: "TRAIN_ATTRIBUTE", 
      attribute, 
      amount: 1 
    });
    
    toast.success(`Trained ${attribute}!`);
  };
  
  const handleAttackRandom = () => {
    if (state.playerStats.energy < 3) {
      toast.error("Not enough energy! Need at least 3 energy to attack.");
      return;
    }
    
    // Instead of trying to dispatch a non-existent action type,
    // let's check if there are any players to attack
    if (state.onlinePlayers.length === 0) {
      toast.error("No players to attack!");
      return;
    }
    
    // Find a random player that is in the same city
    const playersInCity = state.onlinePlayers.filter(
      p => p.cityId === state.currentCity
    );
    
    if (playersInCity.length === 0) {
      toast.error("No players in this city to attack!");
      return;
    }
    
    const randomPlayer = playersInCity[Math.floor(Math.random() * playersInCity.length)];
    
    // Use the FIGHT_PLAYER action which exists in the reducer
    dispatch({ 
      type: "FIGHT_PLAYER", 
      targetId: randomPlayer.id 
    });
    
    toast.success(`Attacked ${randomPlayer.name}!`);
  };
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Player Stats" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>PLAYER STATS</span>
      </div>
      
      <div className="game-content grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strength */}
        <div className="stat-block">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Swords className="w-4 h-4 text-orange-500 mr-2" />
              <span className="font-medium">Strength</span>
            </div>
            <span className="text-amber-500 font-bold">{state.playerStats.strength}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => handleTrainAttribute("strength")}
              className="w-full bg-black/30 hover:bg-black/50 px-4 py-2 rounded"
            >
              Train Strength
            </button>
          </div>
        </div>
        
        {/* Defense */}
        <div className="stat-block">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-blue-500 mr-2" />
              <span className="font-medium">Defense</span>
            </div>
            <span className="text-amber-500 font-bold">{state.playerStats.defense}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => handleTrainAttribute("defense")}
              className="w-full bg-black/30 hover:bg-black/50 px-4 py-2 rounded"
            >
              Train Defense
            </button>
          </div>
        </div>
        
        {/* Speed */}
        <div className="stat-block">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="font-medium">Speed</span>
            </div>
            <span className="text-amber-500 font-bold">{state.playerStats.speed}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => handleTrainAttribute("speed")}
              className="w-full bg-black/30 hover:bg-black/50 px-4 py-2 rounded"
            >
              Train Speed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
