import React from 'react';
import { Shield, AlertTriangle, CreditCard, RunFast, Swords, HandCoins } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';

const outcomeIcons = {
  bribe: HandCoins,
  flee: RunFast,
  fight: Swords,
  surrender: Shield
};

export const PoliceEncounterModal = () => {
  const { state, dispatch } = useGame();
  const { activePoliceEncounter, playerStats } = state;
  
  if (!activePoliceEncounter) {
    return null;
  }
  
  const handleResolveEncounter = (optionIndex: number) => {
    const option = activePoliceEncounter.options[optionIndex];
    
    // Check energy requirement
    if (playerStats.energy < option.energyCost) {
      toast.error("Not enough energy for this action!");
      return;
    }
    
    // Check attribute requirement if present
    if (option.requiredAttribute) {
      const { type, value } = option.requiredAttribute;
      if (playerStats[type] < value) {
        toast.error(`Your ${type} is too low for this action! You need at least ${value}.`);
        return;
      }
    }
    
    // Cannot afford bribe
    if (option.outcome === 'bribe' && state.money < Math.abs(option.moneyChange)) {
      toast.error("You don't have enough money for this bribe!");
      return;
    }
    
    // Resolve the encounter
    dispatch({ type: 'RESOLVE_POLICE_ENCOUNTER', outcomeIndex: optionIndex });
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 rounded-lg border bg-card shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-destructive" />
          <h2 className="text-xl font-bold">{activePoliceEncounter.title}</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">{activePoliceEncounter.description}</p>
        
        <div className="space-y-3">
          {activePoliceEncounter.options.map((option, index) => {
            const Icon = outcomeIcons[option.outcome];
            const disabled = 
              (option.energyCost > playerStats.energy) || 
              (option.outcome === 'bribe' && state.money < Math.abs(option.moneyChange)) ||
              (option.requiredAttribute && playerStats[option.requiredAttribute.type] < option.requiredAttribute.value);
            
            return (
              <button
                key={index}
                onClick={() => handleResolveEncounter(index)}
                disabled={disabled}
                className={`w-full p-3 flex items-center justify-between rounded-md border ${
                  disabled 
                    ? 'bg-card/50 cursor-not-allowed opacity-50' 
                    : 'bg-card hover:bg-accent/50 hover:border-accent transition-colors'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{option.text}</span>
                </div>
                
                <div className="flex flex-col items-end text-xs">
                  {option.energyCost > 0 && (
                    <span className="text-amber-500">Energy: -{option.energyCost}</span>
                  )}
                  {option.moneyChange < 0 && (
                    <span className="text-red-500">Money: ${option.moneyChange}</span>
                  )}
                  {option.requiredAttribute && (
                    <span className={playerStats[option.requiredAttribute.type] >= option.requiredAttribute.value 
                      ? "text-green-500" 
                      : "text-red-500"}>
                      {option.requiredAttribute.type.charAt(0).toUpperCase() + option.requiredAttribute.type.slice(1)}: 
                      {playerStats[option.requiredAttribute.type]}/{option.requiredAttribute.value}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    Success: {Math.round(option.successChance * 100)}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
