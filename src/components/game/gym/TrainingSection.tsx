
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Dumbbell, Shield, Gauge } from 'lucide-react';
import { PlayerStats } from '../../../types/game';
import { 
  calculateAttributeGain, 
  getTrainingEffectiveness,
  TrainingEffectiveness
} from './AttributeCalculator';
import { AttributeCard } from './AttributeCard';

interface TrainingSectionProps {
  playerStats: PlayerStats;
  onTrainAttribute: (attribute: "strength" | "defense" | "speed", amount: number) => void;
}

export const TrainingSection = ({ playerStats, onTrainAttribute }: TrainingSectionProps) => {
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
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed") => {
    if (playerStats.energy < 1) {
      toast.error("Not enough energy to train!");
      return;
    }
    
    const gainAmount = calculateAttributeGain(playerStats.level, playerStats.awake);
    
    onTrainAttribute(attribute, gainAmount);
    
    // Track last training for animation
    setLastTraining({
      attribute,
      amount: gainAmount,
      timestamp: Date.now()
    });
    
    toast.success(`Trained ${attribute}! +${gainAmount} points`);
  };
  
  // Pre-calculate gain amounts for each attribute
  const strengthGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  const defenseGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  const speedGain = calculateAttributeGain(playerStats.level, playerStats.awake);
  
  // Get effectiveness categories based on gain amounts
  const strengthEffectiveness = getTrainingEffectiveness(strengthGain);
  const defenseEffectiveness = getTrainingEffectiveness(defenseGain);
  const speedEffectiveness = getTrainingEffectiveness(speedGain);
  
  return (
    <>
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
    </>
  );
};
