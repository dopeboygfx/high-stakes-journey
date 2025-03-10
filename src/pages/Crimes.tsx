
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { NerveStatus } from '../components/game/crimes/NerveStatus';
import { CrimesList } from '../components/game/crimes/CrimesList';
import { MarketHeader } from '../components/game/market/MarketHeader';
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
    <div className="container mx-auto p-3 space-y-4">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-1.5 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Criminal Activities</h1>
      </div>
      
      <MarketHeader 
        isHighRisk={false} 
        cityLevel={city.levelRequirement || 1}
        playerLevel={playerStats.level}
        isHighNerve={hasHighNerveCrimes}
        nerveRequired={highestNerveRequired}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4 md:col-span-2">
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
        
        <div className="space-y-4">
          <PlayerStatsPanel />
        </div>
      </div>
    </div>
  );
};

export default Crimes;
