
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Progress } from '../ui/progress';
import { Dumbbell, Shield, Zap, Gauge, PillBottle, Users, Banknote } from 'lucide-react';
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
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Fight" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>FIGHT MOBSTERS</span>
      </div>
      
      <div className="game-content">
        <div className="flex justify-between items-center bg-black/30 px-4 py-2 rounded-md mb-3">
          <div className="font-bold text-xl text-white">19.1k <span className="text-sm font-normal text-gray-400">wins</span></div>
          <div className="font-bold text-xl text-white">38 <span className="text-sm font-normal text-gray-400">kills</span></div>
        </div>
        
        {state.lastCombat && (
          <div className="mb-4 p-3 border rounded-md bg-accent/10 text-accent border-accent/20">
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
        
        <button
          onClick={() => dispatch({ type: "ATTACK_RANDOM_ENEMY" })}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md transition-colors"
        >
          Fight Random Enemy
        </button>
      </div>
    </div>
  );
};
