
import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { CITIES } from "../constants/gameData";
import { CrimesList } from "../components/game/crimes/CrimesList";
import { NerveStatus } from "../components/game/crimes/NerveStatus";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertTriangle, Skull } from "lucide-react";
import { GameHeader } from "../components/game/GameHeader";
import { FloatingStatusBar } from "../components/game/FloatingStatusBar";
import { MarketHeader } from "../components/game/market/MarketHeader";

export const Crimes = () => {
  const { state, dispatch } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  
  // Check for nerve regeneration on component mount and when playerStats changes
  useEffect(() => {
    dispatch({ type: "REGENERATE_NERVE" });
    
    // Set up an interval to check for nerve regeneration every minute
    const interval = setInterval(() => {
      dispatch({ type: "REGENERATE_NERVE" });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  const handleCommitCrime = (crimeId: string) => {
    dispatch({ type: "COMMIT_CRIME", crimeId });
  };
  
  const handleRegenerateNerve = () => {
    dispatch({ type: "REGENERATE_NERVE" });
  };
  
  // Check if any crime results happened
  const lastCrime = state.lastCrimeResult;
  
  return (
    <div className="container mx-auto p-4 pb-24">
      <GameHeader 
        title="Criminal Network"
        subtitle="Commit crimes to earn money and experience"
      />
      
      <div className="space-y-4 mt-4">
        <MarketHeader 
          isHighRisk={state.heat > 70} 
          cityLevel={currentCity.levelRequirement || 1}
          playerLevel={state.playerStats.level}
          isHighNerve={true}
          nerveRequired={1}
        />
        
        {state.heat > 70 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High Risk Alert!</AlertTitle>
            <AlertDescription>
              Your heat level is dangerously high ({state.heat}%). Committing crimes now has a higher chance of police encounters.
            </AlertDescription>
          </Alert>
        )}
        
        <NerveStatus 
          nerve={state.playerStats.nerve}
          maxNerve={state.playerStats.maxNerve}
          lastRegen={state.playerStats.lastNerveRegen}
          onRegenerate={handleRegenerateNerve}
        />
        
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Available Crimes</h3>
          <Badge variant="outline" className="flex items-center">
            <Skull className="w-3 h-3 mr-1 text-destructive" />
            <span>Wanted Level: {state.wantedLevel}/5</span>
          </Badge>
        </div>
        
        <CrimesList 
          crimes={state.availableCrimes || []}
          playerNerve={state.playerStats.nerve}
          playerLevel={state.playerStats.level}
          currentCity={state.currentCity}
          onCommitCrime={handleCommitCrime}
        />
      </div>
      
      <FloatingStatusBar />
    </div>
  );
};
