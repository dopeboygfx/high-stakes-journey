
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Shield, Sword, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { formatMoney } from '../utils/gameUtils';

// Mock online players - in a real application this would come from a backend
const MOCK_ONLINE_PLAYERS = [
  {
    id: 'player1',
    name: 'StreetFighter88',
    cityId: 'miami',
    stats: {
      level: 2,
      exp: 50,
      expToNextLevel: 150,
      strength: 8,
      defense: 6,
      speed: 7,
      energy: 10,
      maxEnergy: 12,
      awake: 10000
    },
    lastActive: Date.now()
  },
  {
    id: 'player2',
    name: 'DrugLord2000',
    cityId: 'ny',
    stats: {
      level: 3,
      exp: 100,
      expToNextLevel: 225,
      strength: 10,
      defense: 9,
      speed: 8,
      energy: 15,
      maxEnergy: 15,
      awake: 12000
    },
    lastActive: Date.now()
  },
  {
    id: 'player3',
    name: 'ShadowDealer',
    cityId: 'vegas',
    stats: {
      level: 1,
      exp: 20,
      expToNextLevel: 100,
      strength: 4,
      defense: 5,
      speed: 7,
      energy: 8,
      maxEnergy: 10,
      awake: 9000
    },
    lastActive: Date.now()
  },
  {
    id: 'player4',
    name: 'MiamiHustler',
    cityId: 'miami',
    stats: {
      level: 2,
      exp: 80,
      expToNextLevel: 150,
      strength: 6,
      defense: 8,
      speed: 5,
      energy: 12,
      maxEnergy: 12,
      awake: 11000
    },
    lastActive: Date.now()
  },
  {
    id: 'player5',
    name: 'LAKingpin',
    cityId: 'la',
    stats: {
      level: 4,
      exp: 200,
      expToNextLevel: 337,
      strength: 12,
      defense: 10,
      speed: 9,
      energy: 16,
      maxEnergy: 18,
      awake: 13500
    },
    lastActive: Date.now()
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const { currentCity, playerStats } = state;
  
  // Simulate fetching online players
  useEffect(() => {
    dispatch({ 
      type: 'UPDATE_ONLINE_PLAYERS', 
      players: MOCK_ONLINE_PLAYERS 
    });
  }, [dispatch]);
  
  // Filter players by current city
  const playersInCity = state.onlinePlayers.filter(player => player.cityId === currentCity);
  
  const handleFight = (playerId: string) => {
    if (playerStats.energy < 3) {
      toast.error("Not enough energy to fight! You need at least 3 energy.");
      return;
    }
    
    dispatch({ type: 'FIGHT_PLAYER', targetId: playerId });
    
    // Show combat result
    if (state.lastCombat?.winner === 'player') {
      toast.success(state.lastCombat.description);
    } else {
      toast.error(state.lastCombat?.description || "You were defeated!");
    }
  };
  
  const getPlayerStrengthClass = (playerStrength: number, opponentStrength: number) => {
    if (playerStrength > opponentStrength + 2) return "text-green-500";
    if (playerStrength < opponentStrength - 2) return "text-red-500";
    return "text-amber-500";
  };
  
  const getCurrentCityName = () => {
    return state.cities.find(city => city.id === currentCity)?.name || "Unknown";
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Players in {getCurrentCityName()}</h1>
      </div>
      
      <div className="p-4 bg-card rounded-lg border mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Stats</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="font-medium">{playerStats.level}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Strength</p>
            <p className="font-medium">{playerStats.strength}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Defense</p>
            <p className="font-medium">{playerStats.defense}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Energy</p>
            <p className="font-medium">{playerStats.energy}/{playerStats.maxEnergy}</p>
          </div>
        </div>
      </div>
      
      {playersInCity.length > 0 ? (
        <div className="grid gap-4">
          {playersInCity.map(player => (
            <div key={player.id} className="p-4 border rounded-lg bg-card flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{player.name}</h3>
                <p className="text-sm text-muted-foreground">Level {player.stats.level}</p>
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center">
                    <Sword className="h-4 w-4 mr-1" />
                    <span className={getPlayerStrengthClass(playerStats.strength, player.stats.strength)}>
                      {player.stats.strength}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span className={getPlayerStrengthClass(playerStats.defense, player.stats.defense)}>
                      {player.stats.defense}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>{player.stats.speed}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleFight(player.id)}
                disabled={playerStats.energy < 3}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Fight (3 Energy)
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
          <p className="text-lg font-medium mb-2">No players in this city</p>
          <p className="text-muted-foreground">Travel to another city to find more players</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
