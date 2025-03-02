
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Dumbbell, Shield, Gauge, RefreshCw } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { formatMoney } from '../utils/gameUtils';

const Gym = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { playerStats } = state;
  
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                onClick={handleRestoreEnergy}
                disabled={playerStats.energy >= playerStats.maxEnergy || state.money < energyRestoreCost}
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
        
        <div className="p-5 bg-card rounded-lg border flex flex-col items-center justify-center">
          <Dumbbell className="h-12 w-12 mb-3 text-primary" />
          <h3 className="text-lg font-semibold">Strength</h3>
          <p className="text-3xl font-bold my-2">{playerStats.strength}</p>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Increases your attack power and damage in combat
          </p>
          <Button 
            onClick={() => handleTrainAttribute("strength")}
            disabled={playerStats.energy < 1}
            className="w-full"
          >
            Train Strength (1 Energy)
          </Button>
        </div>
        
        <div className="p-5 bg-card rounded-lg border flex flex-col items-center justify-center">
          <Shield className="h-12 w-12 mb-3 text-primary" />
          <h3 className="text-lg font-semibold">Defense</h3>
          <p className="text-3xl font-bold my-2">{playerStats.defense}</p>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Reduces damage taken in combat and improves survivability
          </p>
          <Button 
            onClick={() => handleTrainAttribute("defense")}
            disabled={playerStats.energy < 1}
            className="w-full"
          >
            Train Defense (1 Energy)
          </Button>
        </div>
        
        <div className="p-5 bg-card rounded-lg border flex flex-col items-center justify-center">
          <Gauge className="h-12 w-12 mb-3 text-primary" />
          <h3 className="text-lg font-semibold">Speed</h3>
          <p className="text-3xl font-bold my-2">{playerStats.speed}</p>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Improves attack and defense chances in combat
          </p>
          <Button 
            onClick={() => handleTrainAttribute("speed")}
            disabled={playerStats.energy < 1}
            className="w-full"
          >
            Train Speed (1 Energy)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gym;
