
import { GameState, GameAction, PlayerStats } from "../../types/game";
import { handleLevelUp } from "../utils/playerUtils";
import { toast } from "sonner";

// Calculate combat result between two players
const resolveCombat = (attacker: PlayerStats, defender: PlayerStats) => {
  // Calculate attack power based on strength and speed
  const attackPower = attacker.strength * 1.2 + attacker.speed * 0.5;
  
  // Calculate defense power
  const defensePower = defender.defense * 1.3 + defender.speed * 0.3;
  
  // Add some randomness (80% to 120% of calculated power)
  const randomFactor = 0.8 + Math.random() * 0.4;
  
  // Determine if attacker wins
  const attackerWins = (attackPower * randomFactor) > defensePower;
  
  // Calculate exp gained - base amount + bonus for defeating higher level
  const levelDiff = defender.level - attacker.level;
  const baseExp = 20;
  const expGained = baseExp + (levelDiff > 0 ? levelDiff * 15 : 5);
  
  // Calculate money gained - base amount + level bonus
  const moneyGained = 100 + (defender.level * 50);
  
  return {
    winner: attackerWins ? "player" : "opponent",
    expGained: attackerWins ? expGained : Math.floor(expGained / 4), // Less exp for losing
    moneyGained: attackerWins ? moneyGained : 0, // No money for losing
    description: attackerWins 
      ? `You defeated your opponent with superior ${attacker.strength > attacker.defense ? 'strength' : 'technique'}!` 
      : `You were defeated. Train harder to improve your combat skills.`
  };
};

export const combatReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "FIGHT_PLAYER": {
      // Find the target player from online players
      const targetPlayer = state.onlinePlayers.find(p => p.id === action.targetId);
      if (!targetPlayer) return state;
      
      // Players must be in the same city
      if (targetPlayer.cityId !== state.currentCity) return state;
      
      // Not enough energy to fight
      if (state.playerStats.energy < 3) return state;
      
      // Calculate combat result
      const combatResult = resolveCombat(state.playerStats, targetPlayer.stats);
      
      // Update player stats with combat results, including exp
      const updatedStats = {
        ...state.playerStats,
        exp: state.playerStats.exp + combatResult.expGained,
        energy: state.playerStats.energy - 3 // Combat costs 3 energy
      };
      
      // Handle level up if enough exp gained
      const finalStats = handleLevelUp(updatedStats);
      
      return {
        ...state,
        playerStats: finalStats,
        money: combatResult.winner === "player" 
          ? state.money + combatResult.moneyGained 
          : state.money,
        lastCombat: combatResult,
        stats: {
          ...state.stats,
          fightswon: combatResult.winner === "player" 
            ? state.stats.fightswon + 1 
            : state.stats.fightswon
        }
      };
    }
    
    case "UPDATE_ONLINE_PLAYERS": {
      return {
        ...state,
        onlinePlayers: action.players
      };
    }
    
    default:
      return state;
  }
};
