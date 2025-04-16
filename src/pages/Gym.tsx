
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  calculateOptimalLevels,
  isAtOptimalLevel
} from '../components/game/gym/AttributeCalculator';
import { PlayerLevelCard } from '../components/game/gym/PlayerLevelCard';
import { TrainingEffectivenessInfo } from '../components/game/gym/TrainingEffectivenessInfo';
import { TrainingSection } from '../components/game/gym/TrainingSection';
import { AwakeLevelCard } from '../components/game/gym/AwakeLevelCard';

const Gym = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { playerStats } = state;
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed", amount: number) => {
    dispatch({ 
      type: "TRAIN_ATTRIBUTE", 
      attribute, 
      amount
    });
  };
  
  // Restore energy for money
  const handleRestoreEnergy = () => {
    const cost = 100 * playerStats.level;
    
    if (state.money < cost) {
      toast.error("Not enough money!");
      return;
    }
    
    if (playerStats.energy >= playerStats.maxEnergy) {
      toast.error("Energy already full!");
      return;
    }
    
    dispatch({ type: "REMOVE_MONEY", amount: cost });
    dispatch({ type: "RESTORE_ENERGY", amount: playerStats.maxEnergy });
    toast.success("Energy fully restored!");
  };
  
  // Calculate percentage of energy remaining
  const energyPercentage = (playerStats.energy / playerStats.maxEnergy) * 100;
  
  // Calculate percentage of XP progress to next level
  const expPercentage = (playerStats.exp / playerStats.expToNextLevel) * 100;
  
  // Energy restore cost
  const energyRestoreCost = 100 * playerStats.level;
  
  // Calculate optimal training levels and check if at optimal level
  const optimalLevels = calculateOptimalLevels(playerStats.awake);
  const isPlayerAtOptimalLevel = isAtOptimalLevel(playerStats.level, optimalLevels);
  
  return (
    <div className="container mx-auto p-2 space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/")}
          className="p-1 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold">City Gym</h1>
      </div>
      
      <TrainingEffectivenessInfo />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <PlayerLevelCard 
          playerStats={playerStats}
          expPercentage={expPercentage}
          energyPercentage={energyPercentage}
          optimalLevels={optimalLevels}
          isAtOptimalLevel={isPlayerAtOptimalLevel}
          energyRestoreCost={energyRestoreCost}
          money={state.money}
          onRestoreEnergy={handleRestoreEnergy}
        />
        
        <TrainingSection 
          playerStats={playerStats}
          onTrainAttribute={handleTrainAttribute}
        />
      </div>
      
      <AwakeLevelCard awake={playerStats.awake} />
    </div>
  );
};

export default Gym;
