import { GameState, GameAction, PlayerStats, Consumable, Achievement } from "../types/game";
import { CITIES, VEHICLES, CONSUMABLES } from "../constants/gameData";
import { POLICE_ENCOUNTERS } from "../constants/policeEncounterData";
import { toast } from "sonner";

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

// Calculate awake depletion based on training intensity
const calculateAwakeDepletion = (attribute: string): number => {
  const baseDepletion = 500; // Base amount depleted per training session
  
  // Different attributes might deplete awake at different rates
  switch(attribute) {
    case 'strength':
      return baseDepletion * 1.2; // Strength training is most tiring
    case 'defense':
      return baseDepletion * 1.0; // Defense training is average
    case 'speed':
      return baseDepletion * 0.8; // Speed training is least tiring
    default:
      return baseDepletion;
  }
};

// Check and update achievements
const updateAchievements = (state: GameState): Achievement[] => {
  return state.achievements.map(achievement => {
    // Skip already completed achievements
    if (achievement.completed) return achievement;
    
    let currentProgress = achievement.progress;
    
    // Update progress based on achievement type
    switch(achievement.id) {
      case 'deal_master':
        currentProgress = state.stats.dealsCompleted;
        break;
      case 'world_traveler':
        currentProgress = state.stats.citiesVisited.length;
        break;
      case 'combat_expert':
        currentProgress = state.stats.fightswon;
        break;
      case 'heat_master':
        currentProgress = state.wantedLevel >= 3 ? 1 : 0;
        break;
      case 'millionaire':
        currentProgress = state.money;
        break;
      case 'workout_king':
        currentProgress = state.stats.trainingSessionsCompleted;
        break;
    }
    
    // Check if achievement is completed
    const completed = currentProgress >= achievement.requirement;
    
    return {
      ...achievement,
      progress: currentProgress,
      completed: completed
    };
  });
};

// Generate a random police encounter based on heat and wanted level
const generatePoliceEncounter = (heat: number, wantedLevel: number) => {
  const encounterChance = (heat / 200) + (wantedLevel * 0.05);
  
  if (Math.random() < encounterChance) {
    // Select a random encounter
    return POLICE_ENCOUNTERS[Math.floor(Math.random() * POLICE_ENCOUNTERS.length)];
  }
  
  return null;
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  let updatedState = { ...state };
  
  switch (action.type) {
    case "BUY_DRUG":
      updatedState = {
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
      break;
      
    case "SELL_DRUG": {
      const newInventory = state.inventory
        .map((item) =>
          item.drugId === action.drugId
            ? { ...item, quantity: item.quantity - action.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      updatedState = {
        ...state,
        money: state.money + action.profit,
        inventory: newInventory,
        heat: newInventory.length === 0 ? 0 : state.heat,
        stats: {
          ...state.stats,
          dealsCompleted: state.stats.dealsCompleted + 1,
          totalMoneyEarned: state.stats.totalMoneyEarned + action.profit
        }
      };
      break;
    }
    
    case "TRAVEL_TO_CITY": {
      const hasHeatReduction = state.abilities.find(a => 
        a.id === "smooth_talk" && a.unlocked
      );
      
      const heatIncrease = hasHeatReduction 
        ? Math.round(10 * (1 - hasHeatReduction.magnitude))
        : 10;

      // Check if this is a new city visit
      const alreadyVisited = state.stats.citiesVisited.includes(action.cityId);
      const updatedVisitedCities = alreadyVisited 
        ? state.stats.citiesVisited 
        : [...state.stats.citiesVisited, action.cityId];
      
      updatedState = {
        ...state,
        currentCity: action.cityId,
        heat: state.inventory.length > 0 
          ? Math.min(state.heat + heatIncrease, 100)
          : state.heat,
        stats: {
          ...state.stats,
          citiesVisited: updatedVisitedCities
        }
      };
      
      // Check for police encounter
      const policeEncounter = generatePoliceEncounter(updatedState.heat, updatedState.wantedLevel);
      if (policeEncounter) {
        updatedState.activePoliceEncounter = policeEncounter;
      }
      
      break;
    }
    
    case "SET_TRAVELING":
      updatedState = {
        ...state,
        isTraveling: action.isTraveling,
      };
      break;
      
    case "BUY_VEHICLE": {
      const vehicle = VEHICLES.find(v => v.id === action.vehicleId)!;
      updatedState = {
        ...state,
        money: state.money - vehicle.price,
        currentVehicle: action.vehicleId,
      };
      break;
    }
    
    case "INCREASE_HEAT":
      updatedState = {
        ...state,
        heat: Math.min(state.heat + 10, 100),
        wantedLevel: state.heat >= 90 ? Math.min(state.wantedLevel + 1, 5) : state.wantedLevel,
      };
      break;
      
    case "REDUCE_HEAT":
      updatedState = {
        ...state,
        heat: Math.max(0, state.heat - 5),
      };
      break;
      
    case "ADD_MONEY":
      updatedState = {
        ...state,
        money: state.money + action.amount,
        stats: {
          ...state.stats,
          totalMoneyEarned: state.stats.totalMoneyEarned + action.amount
        }
      };
      break;
      
    case "REMOVE_MONEY":
      updatedState = {
        ...state,
        money: Math.max(0, state.money - action.amount),
      };
      break;
      
    case "UNLOCK_ABILITY": {
      const ability = state.abilities.find(a => a.id === action.abilityId)!;
      if (state.money < ability.cost) return state;

      updatedState = {
        ...state,
        money: state.money - ability.cost,
        abilities: state.abilities.map(a =>
          a.id === action.abilityId ? { ...a, unlocked: true } : a
        ),
      };
      break;
    }
    
    case "UPDATE_REPUTATION":
      updatedState = {
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
      break;
      
    case "UPDATE_POLICE_ACTIVITY":
      updatedState = {
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
      break;
      
    case "ATTEMPT_BRIBE": {
      const success = Math.random() < 0.6 - (state.bribeAttempts * 0.1);
      updatedState = {
        ...state,
        money: state.money - action.amount,
        heat: success ? Math.max(0, state.heat - 30) : state.heat + 20,
        bribeAttempts: state.bribeAttempts + 1,
        wantedLevel: success ? Math.max(0, state.wantedLevel - 1) : state.wantedLevel,
      };
      break;
    }
    
    case "ADD_MARKET_EVENT":
      updatedState = {
        ...state,
        activeMarketEvents: [
          ...state.activeMarketEvents,
          { ...action.event, startTime: Date.now() }
        ],
      };
      break;
      
    case "REMOVE_MARKET_EVENT":
      updatedState = {
        ...state,
        activeMarketEvents: state.activeMarketEvents.filter(
          event => event.id !== action.eventId
        ),
      };
      break;
      
    case "GAIN_EXP": {
      const updatedStats = {
        ...state.playerStats,
        exp: state.playerStats.exp + action.amount
      };
      
      // Check for level up
      const finalStats = handleLevelUp(updatedStats);
      
      updatedState = {
        ...state,
        playerStats: finalStats
      };
      break;
    }
    
    case "TRAIN_ATTRIBUTE": {
      // Not enough energy or awake
      if (state.playerStats.energy < 1 || state.playerStats.awake <= 0) return state;
      
      const energyCost = 1;
      const awakeCost = calculateAwakeDepletion(action.attribute);
      
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          [action.attribute]: state.playerStats[action.attribute] + action.amount,
          energy: Math.max(0, state.playerStats.energy - energyCost),
          awake: Math.max(0, state.playerStats.awake - awakeCost)
        },
        stats: {
          ...state.stats,
          trainingSessionsCompleted: state.stats.trainingSessionsCompleted + 1
        }
      };
      break;
    }
    
    case "RESTORE_ENERGY": {
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          energy: Math.min(
            state.playerStats.maxEnergy, 
            state.playerStats.energy + action.amount
          )
        }
      };
      break;
    }
    
    case "RESTORE_AWAKE": {
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          awake: Math.min(10000, state.playerStats.awake + action.amount)
        }
      };
      break;
    }
    
    case "BUY_CONSUMABLE": {
      const consumable = CONSUMABLES.find(c => c.id === action.consumableId)!;
      const totalCost = consumable.price * action.quantity;
      
      if (state.money < totalCost) return state;
      
      updatedState = {
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
      break;
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
      
      updatedState = {
        ...state,
        consumables: updatedConsumables,
        playerStats: updatedPlayerStats
      };
      break;
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
      
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          exp: state.playerStats.exp + combatResult.expGained,
          energy: state.playerStats.energy - 3 // Combat costs 3 energy
        },
        money: combatResult.winner === "player" 
          ? state.money + combatResult.moneyGained 
          : state.money,
        lastCombat: combatResult,
        stats: {
          ...state.stats,
          fightswon: combatResult.winner === "player" 
            ? state.stats.fightswon + 1 
            : state.stats.fightswon
        }
      };
      break;
    }
    
    case "UPDATE_ONLINE_PLAYERS": {
      updatedState = {
        ...state,
        onlinePlayers: action.players
      };
      break;
    }
    
    case "GAME_OVER":
      updatedState = {
        ...state,
        gameOver: true,
      };
      break;
      
    case "UPDATE_ACHIEVEMENT_PROGRESS": {
      updatedState = {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.achievementId
            ? { 
                ...achievement, 
                progress: action.progress,
                completed: action.progress >= achievement.requirement 
              }
            : achievement
        )
      };
      break;
    }
    
    case "CLAIM_ACHIEVEMENT": {
      updatedState = {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.achievementId && achievement.completed
            ? { ...achievement, claimed: true }
            : achievement
        )
      };
      break;
    }
    
    case "START_POLICE_ENCOUNTER": {
      updatedState = {
        ...state,
        activePoliceEncounter: action.encounter
      };
      break;
    }
    
    case "RESOLVE_POLICE_ENCOUNTER": {
      if (!state.activePoliceEncounter) return state;
      
      const option = state.activePoliceEncounter.options[action.outcomeIndex];
      const success = Math.random() < option.successChance;
      
      // Apply outcome effects
      let heatChange = option.heatChange;
      let moneyChange = option.moneyChange;
      
      if (!success) {
        // Failed attempt has worse outcomes
        heatChange = option.outcome === 'surrender' ? 15 : 30; // Always increase heat on failure
        moneyChange = option.outcome === 'bribe' ? option.moneyChange : -500; // Lose money on failed non-bribe
      }
      
      updatedState = {
        ...state,
        activePoliceEncounter: undefined,
        heat: Math.max(0, Math.min(100, state.heat + heatChange)),
        money: Math.max(0, state.money + moneyChange),
        playerStats: {
          ...state.playerStats,
          energy: Math.max(0, state.playerStats.energy - option.energyCost)
        },
        wantedLevel: success && heatChange < 0 
          ? Math.max(0, state.wantedLevel - 1) // Reduce wanted level on successful de-escalation
          : !success && option.outcome !== 'surrender'
            ? Math.min(5, state.wantedLevel + 1) // Increase wanted level on failed aggressive action
            : state.wantedLevel
      };
      
      // Show outcome message
      if (success) {
        switch(option.outcome) {
          case 'bribe':
            toast.success("The officer accepted your bribe and let you go!");
            break;
          case 'flee':
            toast.success("You managed to escape!");
            break;
          case 'fight':
            toast.success("You overpowered the officers and escaped!");
            break;
          case 'surrender':
            toast.success("The officers believed your story and let you go with a warning.");
            break;
        }
      } else {
        switch(option.outcome) {
          case 'bribe':
            toast.error("The officer rejected your bribe and increased your wanted level!");
            break;
          case 'flee':
            toast.error("Your escape attempt failed! Your heat has increased.");
            break;
          case 'fight':
            toast.error("You couldn't overpower the officers. Your wanted level increased!");
            break;
          case 'surrender':
            toast.error("The officers didn't believe your story but let you go with a fine.");
            break;
        }
      }
      
      break;
    }
    
    case "INCREASE_MAX_ENERGY": {
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          maxEnergy: state.playerStats.maxEnergy + action.amount,
          energy: state.playerStats.energy + action.amount // Also increase current energy
        }
      };
      break;
    }
    
    case "BOOST_ATTRIBUTE": {
      if (!action.attribute) return state;
      
      updatedState = {
        ...state,
        playerStats: {
          ...state.playerStats,
          [action.attribute]: state.playerStats[action.attribute] + action.amount
        }
      };
      break;
    }
    
    case "RECORD_STAT": {
      updatedState = {
        ...state,
        stats: {
          ...state.stats,
          [action.statType]: action.statType === 'totalMoneyEarned' 
            ? state.stats[action.statType] + action.value 
            : state.stats[action.statType] + 1
        }
      };
      break;
    }
    
    default:
      return state;
  }
  
  // Update achievements after state changes
  updatedState.achievements = updateAchievements(updatedState);
  
  return updatedState;
};
