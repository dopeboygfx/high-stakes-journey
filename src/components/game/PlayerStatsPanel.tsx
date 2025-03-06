
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
    <div className="p-2 rounded-lg border bg-card text-card-foreground shadow-sm text-sm">
      <h2 className="text-base font-bold mb-2">Character Stats</h2>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between mb-0.5">
            <span className="text-xs font-medium">Level {playerStats.level}</span>
            <span className="text-xs text-muted-foreground">
              XP: {playerStats.exp}/{playerStats.expToNextLevel}
            </span>
          </div>
          <Progress value={expPercentage} className="h-1.5" />
        </div>
        
        <div>
          <div className="flex justify-between mb-0.5">
            <span className="text-xs font-medium">Energy</span>
            <span className="text-xs text-muted-foreground">
              {playerStats.energy}/{playerStats.maxEnergy}
            </span>
          </div>
          <Progress value={energyPercentage} className="h-1.5" />
        </div>
        
        <div>
          <div className="flex justify-between mb-0.5">
            <span className="text-xs font-medium">Alertness</span>
            <span className="text-xs text-muted-foreground">
              {Math.round(playerStats.awake / 100)}%
            </span>
          </div>
          <Progress value={awakePercentage} className="h-1.5" />
          {awakePillCount > 0 && (
            <button 
              onClick={handleUseAwakePill}
              className="mt-0.5 text-[10px] flex items-center gap-0.5 px-1.5 py-0.5 bg-primary text-primary-foreground rounded">
              <PillBottle className="h-2.5 w-2.5" />
              Use Awake Pill ({awakePillCount})
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-1 pt-1">
          <div className="flex flex-col items-center p-1 border rounded hover:bg-accent/50 cursor-pointer transition-colors" 
               onClick={() => handleTrainAttribute("strength")}>
            <Dumbbell className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Strength</span>
            <span className="text-sm font-bold">{playerStats.strength}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-0.5 text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground rounded disabled:opacity-50">
              Train
            </button>
          </div>
          
          <div className="flex flex-col items-center p-1 border rounded hover:bg-accent/50 cursor-pointer transition-colors"
               onClick={() => handleTrainAttribute("defense")}>
            <Shield className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Defense</span>
            <span className="text-sm font-bold">{playerStats.defense}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-0.5 text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground rounded disabled:opacity-50">
              Train
            </button>
          </div>
          
          <div className="flex flex-col items-center p-1 border rounded hover:bg-accent/50 cursor-pointer transition-colors"
               onClick={() => handleTrainAttribute("speed")}>
            <Gauge className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Speed</span>
            <span className="text-sm font-bold">{playerStats.speed}</span>
            <button 
              disabled={playerStats.energy < 1 || playerStats.awake <= 0}
              className="mt-0.5 text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground rounded disabled:opacity-50">
              Train
            </button>
          </div>
        </div>
        
        {state.lastCombat && (
          <div className="mt-2 p-1.5 border rounded bg-accent/20 text-xs">
            <h3 className="font-medium mb-0.5">Last Combat</h3>
            <p className="text-xs">{state.lastCombat.description}</p>
            <div className="text-xs mt-0.5">
              <span className="text-muted-foreground">XP gained: </span>
              <span className="font-medium">{state.lastCombat.expGained}</span>
              {state.lastCombat.moneyGained > 0 && (
                <>
                  <span className="text-muted-foreground ml-1">Money: </span>
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
