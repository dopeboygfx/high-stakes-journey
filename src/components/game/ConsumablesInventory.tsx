
import React from 'react';
import { useGame } from '../../context/GameContext';
import { CONSUMABLES } from '../../constants/gameData';
import { PillBottle, Beaker, Dumbbell, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const consumableIcons: Record<string, any> = {
  awake_pill: PillBottle,
  energy_drink: Beaker,
  strength_boost: Dumbbell,
  defense_boost: Shield,
  speed_boost: Zap,
};

export const ConsumablesInventory = () => {
  const { state, dispatch } = useGame();
  
  const handleUseConsumable = (consumableId: string) => {
    const consumable = CONSUMABLES.find(c => c.id === consumableId);
    if (!consumable) return;
    
    const inventoryItem = state.consumables.find(c => c.consumableId === consumableId);
    if (!inventoryItem || inventoryItem.quantity <= 0) {
      toast.error(`No ${consumable.name} left in inventory!`);
      return;
    }
    
    dispatch({ type: "USE_CONSUMABLE", consumableId });
    toast.success(`Used ${consumable.name}!`);
  };
  
  // Filter to only show consumables that the player has
  const playerConsumables = state.consumables.filter(c => c.quantity > 0);
  
  if (playerConsumables.length === 0) {
    return (
      <div className="p-4 rounded-lg border bg-card">
        <h2 className="text-xl font-bold mb-4">Inventory</h2>
        <p className="text-muted-foreground text-center py-4">No consumables in inventory</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h2 className="text-xl font-bold mb-4">Consumables</h2>
      
      <div className="grid gap-3">
        {playerConsumables.map((item) => {
          const consumable = CONSUMABLES.find(c => c.id === item.consumableId);
          if (!consumable) return null;
          
          const Icon = consumableIcons[consumable.id] || Beaker;
          
          return (
            <div key={item.consumableId} className="flex items-center justify-between p-3 border rounded-md bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{consumable.name}</h3>
                  <p className="text-xs text-muted-foreground">{consumable.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">×{item.quantity}</span>
                <button
                  onClick={() => handleUseConsumable(item.consumableId)}
                  className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
