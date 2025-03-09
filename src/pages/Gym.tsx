
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Dumbbell, Shield, Gauge, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { AttributeCard } from '../components/game/gym/AttributeCard';
import { PlayerLevelCard } from '../components/game/gym/PlayerLevelCard';
import { TrainingEffectivenessInfo } from '../components/game/gym/TrainingEffectivenessInfo';
import { Card } from '../components/ui/card';

const Gym = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { playerStats } = state;
  
  // Track last training session results for visual feedback
  const [lastTraining, setLastTraining] = useState<{
    attribute: string;
    amount: number;
    timestamp: number;
  } | null>(null);
  
  // Clear the last training after a delay (for animation)
  useEffect(() => {
    if (lastTraining) {
      const timer = setTimeout(() => {
        setLastTraining(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastTraining]);
  
  const calculateAttributeGain = (level: number, awake: number): number => {
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
  
  const getTrainingEffectiveness = (gain: number): 'optimal' | 'good' | 'poor' => {
    if (gain >= 3) return 'optimal';
    if (gain >= 2) return 'good';
    return 'poor';
  };
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed") => {
    if (playerStats.energy < 1) {
      toast.error("Not enough energy to train!");
      return;
    }
    
    const gainAmount = calculateAttributeGain(playerStats.level, playerStats.awake);
    
    dispatch({ 
      type: "TRAIN_ATTRIBUTE", 
      attribute, 
      amount: gainAmount 
    });
    
    // Track last training for animation
    setLastTraining({
      attribute,
      amount: gainAmount,
      timestamp: Date.now()
    });
    
    toast.success(`Trained ${attribute}! +${gainAmount} points`);
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
  
  // Calculate optimal training levels based on awake
  const calculateOptimalLevels = () => {
    const awakeDiv100 = playerStats.awake / 100;
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
  
  const optimalLevels = calculateOptimalLevels();
  const isAtOptimalLevel = optimalLevels.includes(playerStats.level);
  
  // Pre-calculate gain amounts for each attribute
  const strengthGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  const defenseGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  const speedGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  
  // Get effectiveness categories based on gain amounts
  const strengthEffectiveness = getTrainingEffectiveness(strengthGain);
  const defenseEffectiveness = getTrainingEffectiveness(defenseGain);
  const speedEffectiveness = getTrainingEffectiveness(speedGain);
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">City Gym</h1>
      </div>
      
      <TrainingEffectivenessInfo />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PlayerLevelCard 
          playerStats={playerStats}
          expPercentage={expPercentage}
          energyPercentage={energyPercentage}
          optimalLevels={optimalLevels}
          isAtOptimalLevel={isAtOptimalLevel}
          energyRestoreCost={energyRestoreCost}
          money={state.money}
          onRestoreEnergy={handleRestoreEnergy}
        />
        
        <AttributeCard 
          icon={Dumbbell}
          name="Strength"
          value={playerStats.strength}
          description="Increases your attack power and damage in combat"
          onTrain={() => handleTrainAttribute("strength")}
          disabled={playerStats.energy < 1}
          effectiveness={strengthEffectiveness}
          gainAmount={strengthGain}
        />
        
        <AttributeCard 
          icon={Shield}
          name="Defense"
          value={playerStats.defense}
          description="Reduces damage taken in combat and improves survivability"
          onTrain={() => handleTrainAttribute("defense")}
          disabled={playerStats.energy < 1}
          effectiveness={defenseEffectiveness}
          gainAmount={defenseGain}
        />
        
        <AttributeCard 
          icon={Gauge}
          name="Speed"
          value={playerStats.speed}
          description="Improves attack and defense chances in combat"
          onTrain={() => handleTrainAttribute("speed")}
          disabled={playerStats.energy < 1}
          effectiveness={speedEffectiveness}
          gainAmount={speedGain}
        />
      </div>
      
      <Card className="p-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">Your Awake Level</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Your current awake level: <span className="font-medium">{playerStats.awake}/10000</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Training sessions decrease your awake level. When your awake level is low, your training effectiveness
          will decrease. Use consumables from the shop to restore your awake level.
        </p>
      </Card>
    </div>
  );
};

export default Gym;
