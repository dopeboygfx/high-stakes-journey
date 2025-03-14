
import React from 'react';
import { useGame } from '../../context/GameContext';
import { CONSUMABLES } from '../../constants/gameData';
import { PillBottle, Beaker, Dumbbell, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { formatMoney } from '../../utils/gameUtils';
import { Button } from '../ui/button';
import { getCityConsumables } from '../../utils/shopUtils';

const consumableIcons: Record<string, any> = {
  awake_pill: PillBottle,
  energy_drink: Beaker,
  strength_boost: Dumbbell,
  defense_boost: Shield,
  speed_boost: Zap,
};

export const ConsumablesShop = () => {
  const { state, dispatch } = useGame();
  
  // Get available consumables for the current city
  const availableConsumables = getCityConsumables(state.currentCity);
  
  const handleBuyConsumable = (consumableId: string, quantity: number = 1) => {
    const consumable = CONSUMABLES.find(c => c.id === consumableId);
    if (!consumable) return;
    
    if (state.money < consumable.price * quantity) {
      toast.error("Not enough money!");
      return;
    }
    
    dispatch({ 
      type: "BUY_CONSUMABLE", 
      consumableId, 
      quantity 
    });
    
    toast.success(`Bought ${quantity} ${consumable.name}!`);
  };
  
  const getConsumableCount = (consumableId: string): number => {
    const found = state.consumables.find(c => c.consumableId === consumableId);
    return found ? found.quantity : 0;
  };
  
  return (
    <div className="p-2 rounded-lg border bg-card text-sm">
      <h2 className="text-base font-bold mb-2">Premium Supplies</h2>
      
      <div className="grid gap-2">
        {availableConsumables.map((consumable) => {
          const Icon = consumableIcons[consumable.id] || Beaker;
          const count = getConsumableCount(consumable.id);
          
          return (
            <div key={consumable.id} className="p-2 border rounded flex items-center justify-between bg-background">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center bg-primary/10 rounded-full">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-medium">{consumable.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{consumable.description}</p>
                  {count > 0 && (
                    <span className="text-[10px] font-medium text-primary">
                      In inventory: {count}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-medium">{formatMoney(consumable.price)}</span>
                <Button
                  onClick={() => handleBuyConsumable(consumable.id, 1)}
                  className="h-6 px-2 py-1 text-[10px]"
                  variant="default"
                  size="sm"
                >
                  Buy
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      
      {availableConsumables.length === 0 && (
        <div className="p-3 text-center text-muted-foreground text-sm">
          No supplies available in this city.
          <p className="text-xs">Travel to other cities to find different items.</p>
        </div>
      )}
    </div>
  );
};
