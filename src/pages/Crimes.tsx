
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { NerveStatus } from '../components/game/crimes/NerveStatus';
import { CrimesList } from '../components/game/crimes/CrimesList';
import { CrimesMarketHeader } from '../components/game/crimes/CrimesMarketHeader';
import { PlayerStatsPanel } from '../components/game/PlayerStatsPanel';

const Crimes = () => {
  const { state, dispatch } = useGame();
  const { currentCity, playerStats, availableCrimes } = state;
  
  // Find current city
  const city = state.cities.find(c => c.id === currentCity)!;
  
  // Regenerate nerve when visiting the page
  useEffect(() => {
    dispatch({ type: "REGENERATE_NERVE" });
  }, [dispatch]);
  
  // Function to handle nerve regeneration
  const handleRegenerateNerve = () => {
    dispatch({ type: "REGENERATE_NERVE" });
  };
  
  // Function to commit a crime
  const handleCommitCrime = (crimeId: string) => {
    dispatch({ type: "COMMIT_CRIME", crimeId });
  };
  
  // Check if any crimes require high nerve
  const hasHighNerveCrimes = availableCrimes.some(crime => crime.nerveRequired >= 5);
  
  // Get highest nerve requirement
  const highestNerveRequired = Math.max(...availableCrimes.map(crime => crime.nerveRequired));
  
  return (
    <div className="container mx-auto p-2 space-y-2">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="p-1 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold">Criminal Activities</h1>
      </div>
      
      <CrimesMarketHeader 
        isHighRisk={false} 
        cityLevel={city.levelRequirement || 1}
        playerLevel={playerStats.level}
        isHighNerve={hasHighNerveCrimes}
        nerveRequired={highestNerveRequired}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="space-y-2 md:col-span-2">
          <NerveStatus 
            nerve={playerStats.nerve} 
            maxNerve={playerStats.maxNerve}
            lastRegen={playerStats.lastNerveRegen}
            onRegenerate={handleRegenerateNerve}
          />
          
          <CrimesList 
            crimes={availableCrimes}
            playerNerve={playerStats.nerve}
            playerLevel={playerStats.level}
            currentCity={currentCity}
            onCommitCrime={handleCommitCrime}
          />
        </div>
        
        <div>
          <PlayerStatsPanel />
        </div>
      </div>
    </div>
  );
};

export default Crimes;
