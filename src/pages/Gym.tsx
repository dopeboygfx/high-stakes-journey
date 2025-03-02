
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
  
  const handleTrainAttribute = (attribute: "strength" | "defense" | "speed") => {
    if (playerStats.energy < 1) {
      toast.error("Not enough energy to train!");
      return;
    }
    
    dispatch({ 
      type: "TRAIN_ATTRIBUTE", 
      attribute, 
      amount: 1 
    });
    
    // Also gain some experience from training
    dispatch({
      type: "GAIN_EXP",
      amount: 5
    });
    
    toast.success(`Trained ${attribute}! +1 point, +5 XP`);
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
