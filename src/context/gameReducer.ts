
import { GameState, GameAction, PlayerStats } from "../types/game";
import { CITIES, VEHICLES } from "../constants/gameData";

// Calculate exp needed for next level using a simple formula
const calculateExpToNextLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Helper function to handle leveling up
const handleLevelUp = (stats: PlayerStats): PlayerStats => {
  if (stats.exp >= stats.expToNextLevel) {
    const newLevel = stats.level + 1;
    const expRemaining = stats.exp - stats.expToNextLevel;
    const newMaxEnergy = stats.maxEnergy + 2;
    
    return {
      ...stats,
      level: newLevel,
      exp: expRemaining,
      expToNextLevel: calculateExpToNextLevel(newLevel),
      maxEnergy: newMaxEnergy,
      energy: newMaxEnergy, // Restore energy on level up
    };
  }
  return stats;
};

// Calculate combat result between two players
const resolveCombat = (attacker: PlayerStats, defender: PlayerStats) => {
  // Calculate attack power based on strength and speed
  const attackPower = attacker.strength * 1.2 + attacker.speed * 0.5;
  
  // Calculate defense power
  const defensePower = defender.defense * 1.3 + defender.speed * 0.3;
  
  // Add some randomness (80% to 120% of calculated power)
  const randomFactor = 0.8 + Math.random() * 0.4;
  
  // Determine if attacker wins
  const attackerWins = (attackPower * randomFactor) > defensePower;
  
  // Calculate exp gained - base amount + bonus for defeating higher level
  const levelDiff = defender.level - attacker.level;
  const baseExp = 20;
  const expGained = baseExp + (levelDiff > 0 ? levelDiff * 15 : 5);
  
  // Calculate money gained - base amount + level bonus
  const moneyGained = 100 + (defender.level * 50);
  
  return {
    winner: attackerWins ? "player" : "opponent",
    expGained: attackerWins ? expGained : Math.floor(expGained / 4), // Less exp for losing
    moneyGained: attackerWins ? moneyGained : 0, // No money for losing
    description: attackerWins 
      ? `You defeated your opponent with superior ${attacker.strength > attacker.defense ? 'strength' : 'technique'}!` 
      : `You were defeated. Train harder to improve your combat skills.`
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "BUY_DRUG":
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
      };
    case "SELL_DRUG": {
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
      };
    }
    case "TRAVEL_TO_CITY": {
      const hasHeatReduction = state.abilities.find(a => 
        a.id === "smooth_talk" && a.unlocked
      );
      
      const heatIncrease = hasHeatReduction 
        ? Math.round(10 * (1 - hasHeatReduction.magnitude))
        : 10;

      return {
        ...state,
        currentCity: action.cityId,
        heat: state.inventory.length > 0 
          ? Math.min(state.heat + heatIncrease, 100)
          : state.heat,
      };
    }
    case "SET_TRAVELING":
      return {
        ...state,
        isTraveling: action.isTraveling,
      };
    case "BUY_VEHICLE": {
      const vehicle = VEHICLES.find(v => v.id === action.vehicleId)!;
      return {
        ...state,
        money: state.money - vehicle.price,
        currentVehicle: action.vehicleId,
      };
    }
    case "INCREASE_HEAT":
      return {
        ...state,
        heat: Math.min(state.heat + 10, 100),
        wantedLevel: state.heat >= 90 ? Math.min(state.wantedLevel + 1, 5) : state.wantedLevel,
      };
    case "REDUCE_HEAT":
      return {
        ...state,
        heat: Math.max(0, state.heat - 5),
      };
    case "ADD_MONEY":
      return {
        ...state,
        money: state.money + action.amount,
      };
    case "REMOVE_MONEY":
      return {
        ...state,
        money: Math.max(0, state.money - action.amount),
      };
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
    case "UPDATE_REPUTATION":
      return {
        ...state,
        reputations: state.reputations.map(rep =>
          rep.cityId === action.cityId
            ? {
                ...rep,
                level: Math.max(-100, Math.min(100, rep.level + action.amount)),
              }
            : rep
        ),
      };
    case "UPDATE_POLICE_ACTIVITY":
      return {
        ...state,
        policeActivity: state.policeActivity.map(activity =>
          activity.cityId === action.cityId
            ? {
                ...activity,
                level: Math.min(activity.level + 10, 100),
                isInvestigating: activity.level >= 80,
              }
            : activity
        ),
      };
    case "ATTEMPT_BRIBE": {
      const success = Math.random() < 0.6 - (state.bribeAttempts * 0.1);
      return {
        ...state,
        money: state.money - action.amount,
        heat: success ? Math.max(0, state.heat - 30) : state.heat + 20,
        bribeAttempts: state.bribeAttempts + 1,
        wantedLevel: success ? Math.max(0, state.wantedLevel - 1) : state.wantedLevel,
      };
    }
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
      // Not enough energy
      if (state.playerStats.energy < 1) return state;
      
      const energyCost = 1;
      
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          [action.attribute]: state.playerStats[action.attribute] + action.amount,
          energy: Math.max(0, state.playerStats.energy - energyCost)
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
    case "FIGHT_PLAYER": {
      // Find the target player from online players
      const targetPlayer = state.onlinePlayers.find(p => p.id === action.targetId);
      if (!targetPlayer) return state;
      
      // Players must be in the same city
      if (targetPlayer.cityId !== state.currentCity) return state;
      
      // Not enough energy to fight
      if (state.playerStats.energy < 3) return state;
      
      // Calculate combat result
      const combatResult = resolveCombat(state.playerStats, targetPlayer.stats);
      
      // Update player stats based on combat result
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          exp: state.playerStats.exp + combatResult.expGained,
          energy: state.playerStats.energy - 3 // Combat costs 3 energy
        },
        money: combatResult.winner === "player" 
          ? state.money + combatResult.moneyGained 
          : state.money,
        lastCombat: combatResult
      };
    }
    case "UPDATE_ONLINE_PLAYERS": {
      return {
        ...state,
        onlinePlayers: action.players
      };
    }
    case "GAME_OVER":
      return {
        ...state,
        gameOver: true,
      };
    default:
      return state;
  }
};
