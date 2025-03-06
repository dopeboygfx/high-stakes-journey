
import React from 'react';
import { useGame } from '../../context/GameContext';
import { CONSUMABLES } from '../../constants/gameData';
import { PillBottle, Beaker, Dumbbell, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

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
      <div className="p-2 rounded-lg border bg-card text-sm">
        <h2 className="text-base font-semibold mb-1.5">Inventory</h2>
        <p className="text-xs text-muted-foreground text-center py-2">No consumables in inventory</p>
      </div>
    );
  }
  
  return (
    <div className="p-2 rounded-lg border bg-card text-sm">
      <h2 className="text-base font-semibold mb-1.5">Consumables</h2>
      
      <div className="grid gap-1.5">
        {playerConsumables.map((item) => {
          const consumable = CONSUMABLES.find(c => c.id === item.consumableId);
          if (!consumable) return null;
          
          const Icon = consumableIcons[consumable.id] || Beaker;
          
          return (
            <div key={item.consumableId} className="flex items-center justify-between p-1.5 border rounded bg-background/50">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full">
                  <Icon className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-medium">{consumable.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{consumable.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium">×{item.quantity}</span>
                <Button
                  onClick={() => handleUseConsumable(item.consumableId)}
                  className="h-6 px-2 py-0.5 text-[10px]"
                  variant="default"
                  size="sm"
                >
                  Use
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
