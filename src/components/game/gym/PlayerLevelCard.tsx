
import React from 'react';
import { RefreshCw, AlertTriangle, Flame } from 'lucide-react';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { PlayerStats } from '../../../types/game';
import { formatMoney } from '../../../utils/gameUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

interface PlayerLevelCardProps {
  playerStats: PlayerStats;
  expPercentage: number;
  energyPercentage: number;
  optimalLevels: number[];
  isAtOptimalLevel: boolean;
  energyRestoreCost: number;
  money: number;
  onRestoreEnergy: () => void;
}

export const PlayerLevelCard = ({
  playerStats,
  expPercentage,
  energyPercentage,
  optimalLevels,
  isAtOptimalLevel,
  energyRestoreCost,
  money,
  onRestoreEnergy
}: PlayerLevelCardProps) => {
  // Filter optimal levels that are reasonably close to player's current level
  const relevantOptimalLevels = optimalLevels
    .filter(level => level > 0)
    .filter(level => Math.abs(level - playerStats.level) < 20)
    .sort((a, b) => a - b);

  const getClosestOptimalLevel = () => {
    if (isAtOptimalLevel) return playerStats.level;
    
    // Find closest level that's higher than current
    const nextOptimal = relevantOptimalLevels.find(level => level > playerStats.level);
    // If none found or closest is too far, show the closest one
    if (!nextOptimal) {
      return relevantOptimalLevels[relevantOptimalLevels.length - 1];
    }
    return nextOptimal;
  };
  
  const closestOptimalLevel = getClosestOptimalLevel();
  const isAwakeLow = playerStats.awake < 2000;

  return (
    <div className="col-span-1 lg:col-span-3 p-3 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
        <div>
          <h2 className="text-base font-bold">Level {playerStats.level}</h2>
          <p className="text-xs text-muted-foreground">
            XP: {playerStats.exp}/{playerStats.expToNextLevel}
          </p>
          
          <div className="flex items-center mt-1">
            <p className="text-xs text-muted-foreground mr-1">
              Awake: {playerStats.awake}/10000
            </p>
            {isAwakeLow && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Awake level is low, training effectiveness reduced!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="mt-1">
            {relevantOptimalLevels.length > 0 ? (
              <>
                <p className="text-xs font-medium">
                  Nearby optimal levels: {relevantOptimalLevels.join(', ')}
                </p>
                {isAtOptimalLevel ? (
                  <p className="text-xs text-green-500 font-bold flex items-center">
                    <Flame className="h-3 w-3 mr-1" /> You're at an optimal training level!
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Next optimal level: <span className="font-semibold">{closestOptimalLevel}</span>
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">No nearby optimal levels available</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center mt-2 sm:mt-0">
          <div className="mr-2">
            <p className="text-xs text-muted-foreground">Energy</p>
            <p className="text-xs font-medium">{playerStats.energy}/{playerStats.maxEnergy}</p>
          </div>
          <Button 
            variant="outline"
            onClick={onRestoreEnergy}
            disabled={playerStats.energy >= playerStats.maxEnergy || money < energyRestoreCost}
            className="flex items-center gap-1 text-xs py-1 h-auto"
            size="sm"
          >
            <RefreshCw className="h-3 w-3" />
            Restore ({formatMoney(energyRestoreCost)})
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs">Experience</span>
            <span className="text-xs">{Math.round(expPercentage)}%</span>
          </div>
          <Progress value={expPercentage} className="h-1.5" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs">Energy</span>
            <span className="text-xs">{Math.round(energyPercentage)}%</span>
          </div>
          <Progress value={energyPercentage} className="h-1.5" />
        </div>
      </div>
    </div>
  );
};
