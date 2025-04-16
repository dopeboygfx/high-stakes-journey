
import { GameState, GameAction, Crime, CrimeResult } from "../../types/game";
import { toast } from "sonner";
import { handleLevelUp } from "../utils/playerUtils";
import { generatePoliceEncounter } from "../utils/policeUtils";

// Calculate crime success and results
const resolveCrime = (crime: Crime, playerLevel: number): CrimeResult => {
  // Base success rate from the crime definition
  let successRate = crime.successRate;
  
  // Slight bonus for higher level players (1% per level above crime's nerve requirement)
  const levelBonus = Math.min(0.25, (playerLevel - crime.nerveRequired) * 0.01);
  successRate += levelBonus;
  
  // Random factor for success
  const success = Math.random() < successRate;
  
  // Calculate rewards (reduced for failure)
  const moneyGained = success ? crime.moneyGain : 0;
  const expGained = success ? crime.expGain : Math.floor(crime.expGain * 0.2); // 20% exp for failed attempts
  
  // Generate appropriate message
  let message;
  if (success) {
    message = `Success! You completed the ${crime.name} and earned $${moneyGained}.`;
  } else {
    message = `Failed! You couldn't successfully complete the ${crime.name}.`;
  }
  
  return {
    success,
    message,
    moneyGained,
    expGained,
    nerveUsed: crime.nerveRequired
  };
};

export const crimeReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "COMMIT_CRIME": {
      // Find the crime
      const crime = state.availableCrimes.find(c => c.id === action.crimeId);
      if (!crime) return state;
      
      // Check if player has enough nerve
      if (state.playerStats.nerve < crime.nerveRequired) {
        toast.error(`Not enough nerve to commit this crime! Required: ${crime.nerveRequired}`);
        return state;
      }
      
      // Check if crime is on cooldown
      const now = Date.now();
      if (crime.lastAttempted && now - crime.lastAttempted < crime.cooldown) {
        const timeLeft = Math.ceil((crime.lastAttempted + crime.cooldown - now) / 1000 / 60);
        toast.error(`This crime is on cooldown. Try again in ${timeLeft} minutes.`);
        return state;
      }
      
      // Resolve the crime
      const crimeResult = resolveCrime(crime, state.playerStats.level);
      
      // Update available crimes with cooldowns
      const updatedCrimes = state.availableCrimes.map(c => 
        c.id === crime.id ? { ...c, lastAttempted: now } : c
      );
      
      // Update player stats
      const updatedStats = {
        ...state.playerStats,
        nerve: Math.max(0, state.playerStats.nerve - crimeResult.nerveUsed),
        exp: state.playerStats.exp + crimeResult.expGained
      };
      
      // Check for level up with the updated exp
      const finalStats = handleLevelUp(updatedStats);
      
      // Show result message
      if (crimeResult.success) {
        toast.success(crimeResult.message);
      } else {
        toast.error(crimeResult.message);
      }
      
      // Check for heat increase on failure (50% chance)
      const heatIncrease = !crimeResult.success && Math.random() < 0.5 ? 5 : 0;
      
      const newState = {
        ...state,
        money: state.money + crimeResult.moneyGained,
        playerStats: finalStats,
        availableCrimes: updatedCrimes,
        lastCrimeResult: crimeResult,
        heat: Math.min(100, state.heat + heatIncrease),
        stats: {
          ...state.stats,
          crimesCompleted: state.stats.crimesCompleted + 1,
          successfulCrimes: crimeResult.success 
            ? state.stats.successfulCrimes + 1 
            : state.stats.successfulCrimes,
          totalMoneyEarned: state.stats.totalMoneyEarned + crimeResult.moneyGained
        }
      };
      
      // Trigger police encounter based on crime (5% chance or 15% for failed crime)
      const encounterChance = crimeResult.success ? 0.05 : 0.15;
      if (Math.random() < encounterChance) {
        const policeEncounter = generatePoliceEncounter(newState.heat, newState.wantedLevel);
        if (policeEncounter) {
          newState.activePoliceEncounter = policeEncounter;
        }
      }
      
      return newState;
    }
    
    case "REGENERATE_NERVE": {
      const now = Date.now();
      const lastRegen = state.playerStats.lastNerveRegen;
      const timeSinceRegen = now - lastRegen;
      
      // Regenerate 1 nerve every 5 minutes (300000 ms)
      const regenRate = 300000;
      const nervesToRegen = Math.floor(timeSinceRegen / regenRate);
      
      if (nervesToRegen > 0) {
        const newNerve = Math.min(
          state.playerStats.maxNerve, 
          state.playerStats.nerve + nervesToRegen
        );
        
        return {
          ...state,
          playerStats: {
            ...state.playerStats,
            nerve: newNerve,
            lastNerveRegen: lastRegen + (nervesToRegen * regenRate)
          }
        };
      }
      
      return state;
    }
    
    default:
      return state;
  }
};
