
import { PlayerStats } from "../../../types/game";

export type TrainingEffectiveness = 'optimal' | 'good' | 'poor';

export const calculateAttributeGain = (level: number, awake: number): number => {
  // Implement the formula based on awake value
  const awakeDiv100 = awake / 100;
  const sumBeforeSubtract = awakeDiv100 / 2;
  const firstOptimalLevel = sumBeforeSubtract - 9;
  
  // Calculate all optimal training levels
  const optimalLevels: number[] = [];
  let currentLevel = firstOptimalLevel;
  
  // Generate 10 optimal levels
  for (let i = 0; i < 10; i++) {
    optimalLevels.push(Math.round(currentLevel));
    currentLevel += sumBeforeSubtract;
  }
  
  // Find how close the player is to an optimal level
  const closestOptimalLevel = optimalLevels.reduce((prev, curr) => {
    return Math.abs(curr - level) < Math.abs(prev - level) ? curr : prev;
  }, optimalLevels[0]);
  
  // Calculate distance from optimal (0 means at optimal level)
  const distanceFromOptimal = Math.abs(level - closestOptimalLevel);
  
  // Base gain is higher at optimal levels, lower as you move away
  let baseGain = 3;
  if (distanceFromOptimal > 0) {
    baseGain = Math.max(1, 3 - Math.floor(distanceFromOptimal / 5));
  }
  
  return baseGain;
};

export const getTrainingEffectiveness = (gain: number): TrainingEffectiveness => {
  if (gain >= 3) return 'optimal';
  if (gain >= 2) return 'good';
  return 'poor';
};

export const calculateOptimalLevels = (awake: number): number[] => {
  const awakeDiv100 = awake / 100;
  const sumBeforeSubtract = awakeDiv100 / 2;
  const firstOptimalLevel = sumBeforeSubtract - 9;
  
  const optimalLevels: number[] = [];
  let currentLevel = firstOptimalLevel;
  
  // Generate 5 optimal levels
  for (let i = 0; i < 5; i++) {
    optimalLevels.push(Math.round(currentLevel));
    currentLevel += sumBeforeSubtract;
  }
  
  return optimalLevels;
};

export const isAtOptimalLevel = (level: number, optimalLevels: number[]): boolean => {
  return optimalLevels.includes(level);
};
