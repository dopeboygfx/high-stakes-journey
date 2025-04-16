import { PlayerStats } from "../../types/game";
import { toast } from "sonner";

// Calculate exp needed for next level using a simple formula
export const calculateExpToNextLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Helper function to handle leveling up
export const handleLevelUp = (stats: PlayerStats): PlayerStats => {
  // Create a mutable copy of stats to work with
  let updatedStats = { ...stats };
  
  // Check if player has enough exp to level up, and keep leveling up if they have enough exp
  while (updatedStats.exp >= updatedStats.expToNextLevel) {
    const newLevel = updatedStats.level + 1;
    const expRemaining = updatedStats.exp - updatedStats.expToNextLevel;
    const newMaxEnergy = updatedStats.maxEnergy + 2;
    
    // Update the stats
    updatedStats = {
      ...updatedStats,
      level: newLevel,
      exp: expRemaining,
      expToNextLevel: calculateExpToNextLevel(newLevel),
      maxEnergy: newMaxEnergy,
      energy: newMaxEnergy, // Restore energy on level up
    };
    
    // Show level up notification
    toast.success(`Level up! You are now level ${newLevel}!`);
  }
  
  return updatedStats;
};

// Calculate awake depletion based on training intensity
export const calculateAwakeDepletion = (attribute: string): number => {
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
