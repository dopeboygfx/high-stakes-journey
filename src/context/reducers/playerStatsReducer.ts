
import { GameState, GameAction } from "../../types/game";
import { CONSUMABLES } from "../../constants/gameData";
import { handleLevelUp, calculateAwakeDepletion } from "../utils/playerUtils";

export const playerStatsReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "GAIN_EXP": {
      const updatedStats = {
        ...state.playerStats,
        exp: state.playerStats.exp + action.amount
      };
      
      // Check for level up
      const finalStats = handleLevelUp(updatedStats);
      
      return {
        ...state,
        playerStats: finalStats
      };
    }
    
    case "TRAIN_ATTRIBUTE": {
      // Not enough energy or awake
      if (state.playerStats.energy < 1 || state.playerStats.awake <= 0) return state;
      
      const energyCost = 1;
      const awakeCost = calculateAwakeDepletion(action.attribute);
      const gainExp = 10; // Base exp for training
      
      // Update player stats including exp gain
      const updatedStats = {
        ...state.playerStats,
        [action.attribute]: state.playerStats[action.attribute] + action.amount,
        energy: Math.max(0, state.playerStats.energy - energyCost),
        awake: Math.max(0, state.playerStats.awake - awakeCost),
        exp: state.playerStats.exp + gainExp
      };
      
      // Check for level up with the updated exp
      const finalStats = handleLevelUp(updatedStats);
      
      return {
        ...state,
        playerStats: finalStats,
        stats: {
          ...state.stats,
          trainingSessionsCompleted: state.stats.trainingSessionsCompleted + 1
        }
      };
    }
    
    case "RESTORE_ENERGY": {
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          energy: Math.min(
            state.playerStats.maxEnergy, 
            state.playerStats.energy + action.amount
          )
        }
      };
    }
    
    case "RESTORE_AWAKE": {
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          awake: Math.min(10000, state.playerStats.awake + action.amount)
        }
      };
    }
    
    case "BUY_CONSUMABLE": {
      const consumable = CONSUMABLES.find(c => c.id === action.consumableId)!;
      const totalCost = consumable.price * action.quantity;
      
      if (state.money < totalCost) return state;
      
      return {
        ...state,
        money: state.money - totalCost,
        consumables: [
          ...state.consumables.filter(item => item.consumableId !== action.consumableId),
          {
            consumableId: action.consumableId,
            quantity: (state.consumables.find(item => item.consumableId === action.consumableId)?.quantity || 0) + action.quantity
          }
        ]
      };
    }
    
    case "USE_CONSUMABLE": {
      const consumable = CONSUMABLES.find(c => c.id === action.consumableId)!;
      const consumableInventory = state.consumables.find(c => c.consumableId === action.consumableId);
      
      if (!consumableInventory || consumableInventory.quantity <= 0) return state;
      
      // Update inventory
      const updatedConsumables = state.consumables
        .map(item => 
          item.consumableId === action.consumableId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      
      // Apply consumable effect
      let updatedPlayerStats = { ...state.playerStats };
      
      switch(consumable.effect) {
        case 'RESTORE_AWAKE':
          const awakeToRestore = Math.floor(10000 * (consumable.magnitude / 100));
          updatedPlayerStats.awake = Math.min(10000, updatedPlayerStats.awake + awakeToRestore);
          break;
        case 'RESTORE_ENERGY':
          const energyToRestore = Math.floor(updatedPlayerStats.maxEnergy * (consumable.magnitude / 100));
          updatedPlayerStats.energy = Math.min(updatedPlayerStats.maxEnergy, updatedPlayerStats.energy + energyToRestore);
          break;
        case 'BOOST_STRENGTH':
          updatedPlayerStats.strength += consumable.magnitude;
          break;
        case 'BOOST_DEFENSE':
          updatedPlayerStats.defense += consumable.magnitude;
          break;
        case 'BOOST_SPEED':
          updatedPlayerStats.speed += consumable.magnitude;
          break;
      }
      
      return {
        ...state,
        consumables: updatedConsumables,
        playerStats: updatedPlayerStats
      };
    }
    
    case "INCREASE_MAX_ENERGY": {
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          maxEnergy: state.playerStats.maxEnergy + action.amount,
          energy: state.playerStats.energy + action.amount // Also increase current energy
        }
      };
    }
    
    case "BOOST_ATTRIBUTE": {
      if (!action.attribute) return state;
      
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          [action.attribute]: state.playerStats[action.attribute] + action.amount
        }
      };
    }
    
    case "RECORD_STAT": {
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.statType]: action.statType === 'totalMoneyEarned' 
            ? state.stats[action.statType] + action.value 
            : state.stats[action.statType] + 1
        }
      };
    }
    
    case "UNLOCK_ABILITY": {
      const ability = state.abilities.find(a => a.id === action.abilityId)!;
      if (state.money < ability.cost) return state;

      return {
        ...state,
        money: state.money - ability.cost,
        abilities: state.abilities.map(a =>
          a.id === action.abilityId ? { ...a, unlocked: true } : a
        ),
      };
    }
    
    default:
      return state;
  }
};
