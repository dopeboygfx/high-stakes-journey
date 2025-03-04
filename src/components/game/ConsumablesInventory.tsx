import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { CONSUMABLES } from '../../constants/gameData';
import { PillBottle, Flask, Dumbbell, Shield, Zap, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const consumableIcons: Record<string, any> = {
  awake_pill: PillBottle,
  energy_drink: Flask,
  strength_boost: Dumbbell,
  defense_boost: Shield,
  speed_boost: Zap,
};

export const ConsumablesInventory = () => {
  const { state, dispatch } = useGame();
  
  const handleUseConsumable = (consumableId: string) => {
    const consumable = state.consumables.find(c => c.consumableId === consumableId);
    
    if (!consumable || consumable.quantity <= 0) {
      toast.error(`No ${consumableId} in inventory!`);
      return;
    }
    
    dispatch({ type: "USE_CONSUMABLE", consumableId });
    
    const consumableData = CONSUMABLES.find(c => c.id === consumableId);
    if (consumableData) {
      toast.success(`Used ${consumableData.name}!`);
    }
  };
  
  if (state.consumables.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
        <h2 className="text-xl font-semibold mb-4">Consumables</h2>
        <p className="text-muted-foreground">No consumables in inventory</p>
        <Link 
          to="/shop" 
          className="flex items-center mt-2 text-sm text-primary"
        >
          <ShoppingBag className="mr-1 h-3 w-3" />
          Visit Shop
        </Link>
      </div>
    );
  }
  
  return (
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Consumables</h2>
      <div className="grid gap-2">
        {state.consumables.map((item) => {
          const consumable = CONSUMABLES.find(c => c.id === item.consumableId);
          if (!consumable) return null;
          
          const Icon = consumableIcons[consumable.id] || Flask;
          
          return (
            <div key={item.consumableId} className="flex justify-between items-center p-2 border rounded-md bg-card/50">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <div>
                  <span className="font-medium text-sm">{consumable.name}</span>
                  <p className="text-xs text-muted-foreground">{consumable.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                <button
                  onClick={() => handleUseConsumable(item.consumableId)}
                  className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
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
