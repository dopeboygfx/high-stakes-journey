
import { GameState, GameAction } from "../../types/game";
import { toast } from "sonner";

export const marketReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "BUY_DRUG":
      // If prices are locked and it's a rapid transaction, apply a penalty
      if (state.pricesLocked && Date.now() - state.lastTransaction < 5000) {
        toast.error("Market authorities have noticed your activity! Prices are temporarily locked.");
        return {
          ...state,
          heat: Math.min(state.heat + 15, 100), // Increase heat for trying to exploit
          lastTransaction: Date.now()
        };
      }
      
      return {
        ...state,
        money: state.money - action.cost,
        inventory: [
          ...state.inventory.filter((item) => item.drugId !== action.drugId),
          {
            drugId: action.drugId,
            quantity:
              (state.inventory.find((item) => item.drugId === action.drugId)
                ?.quantity || 0) + action.quantity,
          },
        ],
        lastTransaction: Date.now()
      };
      
    case "SELL_DRUG": {
      // If prices are locked and it's a rapid transaction, apply a penalty
      if (state.pricesLocked && Date.now() - state.lastTransaction < 5000) {
        toast.error("Market authorities have noticed your activity! Prices are temporarily locked.");
        return {
          ...state,
          heat: Math.min(state.heat + 15, 100), // Increase heat for trying to exploit
          lastTransaction: Date.now()
        };
      }
      
      const newInventory = state.inventory
        .map((item) =>
          item.drugId === action.drugId
            ? { ...item, quantity: item.quantity - action.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      return {
        ...state,
        money: state.money + action.profit,
        inventory: newInventory,
        heat: newInventory.length === 0 ? 0 : state.heat,
        stats: {
          ...state.stats,
          dealsCompleted: state.stats.dealsCompleted + 1,
          totalMoneyEarned: state.stats.totalMoneyEarned + action.profit
        },
        lastTransaction: Date.now()
      };
    }
      
    case "LOCK_PRICES":
      return {
        ...state,
        pricesLocked: true
      };
      
    case "UNLOCK_PRICES":
      return {
        ...state,
        pricesLocked: false,
        priceUpdateTimestamp: Date.now() // Update timestamp to recalculate prices
      };
      
    case "ADD_MARKET_EVENT":
      return {
        ...state,
        activeMarketEvents: [
          ...state.activeMarketEvents,
          { ...action.event, startTime: Date.now() }
        ],
      };
      
    case "REMOVE_MARKET_EVENT":
      return {
        ...state,
        activeMarketEvents: state.activeMarketEvents.filter(
          event => event.id !== action.eventId
        ),
      };
      
    default:
      return state;
  }
};
