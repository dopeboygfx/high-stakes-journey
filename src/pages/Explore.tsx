
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Sword, Trophy, ShieldAlert } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { formatMoney } from '../utils/gameUtils';
import { toast } from 'sonner';

const Explore = () => {
  const { state, dispatch } = useGame();
  const [loading, setLoading] = useState(false);
  
  // Generate random players for the area
  useEffect(() => {
    const generateRandomPlayers = () => {
      const randomPlayerCount = Math.floor(Math.random() * 5) + 3;
      const currentCity = state.currentCity;
      
      const newPlayers = Array.from({ length: randomPlayerCount }).map((_, index) => {
        const playerLevel = Math.max(1, state.playerStats.level - 2 + Math.floor(Math.random() * 5));
        const baseAttribute = Math.max(3, Math.floor(playerLevel * 1.5));
        
        return {
          id: `npc-${index}`,
          name: `Player ${index + 1}`,
          cityId: currentCity,
          stats: {
            level: playerLevel,
            exp: 0,
            expToNextLevel: 100,
            strength: baseAttribute + Math.floor(Math.random() * 5) - 2,
            defense: baseAttribute + Math.floor(Math.random() * 5) - 2,
            speed: baseAttribute + Math.floor(Math.random() * 5) - 2,
            energy: 10,
            maxEnergy: 10,
            awake: 10000
          },
          lastActive: Date.now()
        };
      });
      
      dispatch({ type: "UPDATE_ONLINE_PLAYERS", players: newPlayers });
    };
    
    setLoading(true);
    setTimeout(() => {
      generateRandomPlayers();
      setLoading(false);
    }, 1000);
  }, [state.currentCity]);
  
  const handleFightPlayer = (playerId: string) => {
    if (state.playerStats.energy < 3) {
      toast.error("Not enough energy to fight! You need at least 3 energy.");
      return;
    }
    
    dispatch({ type: "FIGHT_PLAYER", targetId: playerId });
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Explore City</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Players in Area</h2>
          </div>
          
          {loading ? (
            <div className="py-8 flex justify-center">
              <p>Searching the area...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.onlinePlayers.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">No other players in this area</p>
              ) : (
                state.onlinePlayers.map(player => (
                  <div key={player.id} className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">Level {player.stats.level}</p>
                      <div className="mt-1 grid grid-cols-3 gap-2 text-xs">
                        <span>STR: {player.stats.strength}</span>
                        <span>DEF: {player.stats.defense}</span>
                        <span>SPD: {player.stats.speed}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleFightPlayer(player.id)}
                      disabled={state.playerStats.energy < 3}
                      className="px-3 py-1.5 flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Sword className="h-4 w-4" />
                      Fight (3E)
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        <div>
          <div className="p-4 rounded-lg border bg-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Combat Stats</h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Fights Won:</span>
                <span className="font-medium">{state.stats.fightswon}</span>
              </div>
              <div className="flex justify-between">
                <span>Strength:</span>
                <span className="font-medium">{state.playerStats.strength}</span>
              </div>
              <div className="flex justify-between">
                <span>Defense:</span>
                <span className="font-medium">{state.playerStats.defense}</span>
              </div>
              <div className="flex justify-between">
                <span>Speed:</span>
                <span className="font-medium">{state.playerStats.speed}</span>
              </div>
              <div className="flex justify-between">
                <span>Energy:</span>
                <span className="font-medium">{state.playerStats.energy}/{state.playerStats.maxEnergy}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Last Combat</h2>
            </div>
            
            {state.lastCombat ? (
              <div className="space-y-2">
                <p>{state.lastCombat.description}</p>
                <div className="p-2 bg-accent/30 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span>XP Gained:</span>
                    <span className="font-medium">{state.lastCombat.expGained}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Money Gained:</span>
                    <span className="font-medium">{formatMoney(state.lastCombat.moneyGained)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No recent combat</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
