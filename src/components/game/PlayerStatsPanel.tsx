
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Progress } from '../ui/progress';
import { Dumbbell, Shield, Zap, Gauge, PillBottle } from 'lucide-react';
import { toast } from 'sonner';

export const PlayerStatsPanel = () => {
  const { state, dispatch } = useGame();
  const { playerStats } = state;
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed") => {
    if (playerStats.energy < 1) {
      toast.error("Not enough energy to train!");
      return;
    }
    
    if (playerStats.awake <= 0) {
      toast.error("Too tired to train! Use an Awake Pill to restore alertness.");
      return;
    }
    
    dispatch({ 
      type: "TRAIN_ATTRIBUTE", 
      attribute, 
      amount: 1 
    });
  };
  
  const handleUseAwakePill = () => {
    const awakePill = state.consumables.find(c => c.consumableId === "awake_pill");
    
    if (!awakePill || awakePill.quantity <= 0) {
      toast.error("No Awake Pills in inventory!");
      return;
    }
    
    dispatch({ type: "USE_CONSUMABLE", consumableId: "awake_pill" });
    toast.success("Used Awake Pill. Alertness restored!");
  };
  
  // Calculate percentage of XP progress to next level
  const expPercentage = (playerStats.exp / playerStats.expToNextLevel) * 100;
  
  // Calculate percentage of energy remaining
  const energyPercentage = (playerStats.energy / playerStats.maxEnergy) * 100;
  
  // Calculate percentage of awake remaining
  const awakePercentage = (playerStats.awake / 10000) * 100;
  
  // Get awake pill quantity
  const awakePillCount = state.consumables.find(c => c.consumableId === "awake_pill")?.quantity || 0;
  
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold mb-4">Character Stats</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Level {playerStats.level}</span>
            <span className="text-sm text-muted-foreground">
              XP: {playerStats.exp}/{playerStats.expToNextLevel}
            </span>
          </div>
          <Progress value={expPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Energy</span>
            <span className="text-sm text-muted-foreground">
              {playerStats.energy}/{playerStats.maxEnergy}
            </span>
          </div>
          <Progress value={energyPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Alertness</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(playerStats.awake / 100)}%
            </span>
          </div>
          <Progress value={awakePercentage} className="h-2" />
          {awakePillCount > 0 && (
            <button 
              onClick={handleUseAwakePill}
              className="mt-1 text-xs flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded-md">
              <PillBottle className="h-3 w-3" />
              Use Awake Pill ({awakePillCount})
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors" 
               onClick={() => handleTrainAttribute("strength")}>
            <Dumbbell className="h-5 w-5 mb-1 text-primary" />
            <span className="text-sm font-medium">Strength</span>
            <span className="text-lg font-bold">{playerStats.strength}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-1 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md disabled:opacity-50">
              Train (1 E)
            </button>
          </div>
          
          <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
               onClick={() => handleTrainAttribute("defense")}>
            <Shield className="h-5 w-5 mb-1 text-primary" />
            <span className="text-sm font-medium">Defense</span>
            <span className="text-lg font-bold">{playerStats.defense}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-1 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md disabled:opacity-50">
              Train (1 E)
            </button>
          </div>
          
          <div className="flex flex-col items-center p-2 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
               onClick={() => handleTrainAttribute("speed")}>
            <Gauge className="h-5 w-5 mb-1 text-primary" />
            <span className="text-sm font-medium">Speed</span>
            <span className="text-lg font-bold">{playerStats.speed}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-1 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md disabled:opacity-50">
              Train (1 E)
            </button>
          </div>
        </div>
        
        {state.lastCombat && (
          <div className="mt-4 p-3 border rounded-md bg-accent/20">
            <h3 className="font-medium mb-1">Last Combat</h3>
            <p className="text-sm">{state.lastCombat.description}</p>
            <div className="text-sm mt-1">
              <span className="text-muted-foreground">XP gained: </span>
              <span className="font-medium">{state.lastCombat.expGained}</span>
              {state.lastCombat.moneyGained > 0 && (
                <>
                  <span className="text-muted-foreground ml-2">Money: </span>
                  <span className="font-medium">${state.lastCombat.moneyGained}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
