
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Progress } from '../ui/progress';
import { Dumbbell, Shield, Gauge, PillBottle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export const PlayerStatsPanel = () => {
  const { state, dispatch } = useGame();
  const { playerStats } = state;
  
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
            <Button 
              onClick={handleUseAwakePill}
              className="mt-0.5 h-5 text-[10px] px-1.5 py-0.5"
              variant="outline"
              size="sm"
            >
              <PillBottle className="mr-1 h-2.5 w-2.5" />
              Use Awake Pill ({awakePillCount})
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-1 pt-1">
          <div className="flex flex-col items-center p-1 border rounded transition-colors"> 
            <Dumbbell className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Strength</span>
            <span className="text-sm font-bold">{playerStats.strength}</span>
          </div>
          
          <div className="flex flex-col items-center p-1 border rounded transition-colors">
            <Shield className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Defense</span>
            <span className="text-sm font-bold">{playerStats.defense}</span>
          </div>
          
          <div className="flex flex-col items-center p-1 border rounded transition-colors">
            <Gauge className="h-4 w-4 mb-0.5 text-primary" />
            <span className="text-xs font-medium">Speed</span>
            <span className="text-sm font-bold">{playerStats.speed}</span>
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
