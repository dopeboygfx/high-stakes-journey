
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { PlayerStats } from '../../../types/game';
import { formatMoney } from '../../../utils/gameUtils';

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
  return (
    <div className="col-span-1 lg:col-span-3 p-5 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Level {playerStats.level}</h2>
          <p className="text-sm text-muted-foreground">
            XP: {playerStats.exp}/{playerStats.expToNextLevel}
          </p>
          <p className="text-sm text-muted-foreground">
            Awake: {playerStats.awake}
          </p>
          <div className="mt-2">
            <p className="text-sm font-medium">
              Optimal training levels: {optimalLevels.join(', ')}
            </p>
            {isAtOptimalLevel && (
              <p className="text-sm text-green-500 font-bold">You're at an optimal training level!</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="mr-4">
            <p className="text-sm text-muted-foreground">Energy</p>
            <p className="font-medium">{playerStats.energy}/{playerStats.maxEnergy}</p>
          </div>
          <Button 
            variant="outline"
            onClick={onRestoreEnergy}
            disabled={playerStats.energy >= playerStats.maxEnergy || money < energyRestoreCost}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Restore ({formatMoney(energyRestoreCost)})
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Experience</span>
          </div>
          <Progress value={expPercentage} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Energy</span>
          </div>
          <Progress value={energyPercentage} className="h-2" />
        </div>
      </div>
    </div>
  );
};
