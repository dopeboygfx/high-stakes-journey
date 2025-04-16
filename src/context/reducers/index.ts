
import { GameState, GameAction } from "../../types/game";
import { marketReducer } from "./marketReducer";
import { travelReducer } from "./travelReducer";
import { playerStatsReducer } from "./playerStatsReducer";
import { crimeReducer } from "./crimeReducer";
import { combatReducer } from "./combatReducer";
import { achievementReducer } from "./achievementReducer";
import { policeReducer } from "./policeReducer";
import { updateAchievements } from "../utils/achievementUtils";

// Main reducer that delegates to other reducers based on action type
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  let updatedState = { ...state };
  
  // Group actions by their functional area
  if (
    action.type === "BUY_DRUG" || 
    action.type === "SELL_DRUG" || 
    action.type === "LOCK_PRICES" || 
    action.type === "UNLOCK_PRICES" ||
    action.type === "ADD_MARKET_EVENT" ||
    action.type === "REMOVE_MARKET_EVENT"
  ) {
    updatedState = marketReducer(state, action);
  } else if (
    action.type === "TRAVEL_TO_CITY" || 
    action.type === "SET_TRAVELING" || 
    action.type === "BUY_VEHICLE"
  ) {
    updatedState = travelReducer(state, action);
  } else if (
    action.type === "GAIN_EXP" || 
    action.type === "TRAIN_ATTRIBUTE" || 
    action.type === "RESTORE_ENERGY" || 
    action.type === "RESTORE_AWAKE" ||
    action.type === "BUY_CONSUMABLE" ||
    action.type === "USE_CONSUMABLE" ||
    action.type === "INCREASE_MAX_ENERGY" ||
    action.type === "BOOST_ATTRIBUTE" ||
    action.type === "RECORD_STAT" || 
    action.type === "UNLOCK_ABILITY"
  ) {
    updatedState = playerStatsReducer(state, action);
  } else if (
    action.type === "COMMIT_CRIME" || 
    action.type === "REGENERATE_NERVE"
  ) {
    updatedState = crimeReducer(state, action);
  } else if (
    action.type === "FIGHT_PLAYER" || 
    action.type === "UPDATE_ONLINE_PLAYERS"
  ) {
    updatedState = combatReducer(state, action);
  } else if (
    action.type === "UPDATE_ACHIEVEMENT_PROGRESS" || 
    action.type === "CLAIM_ACHIEVEMENT"
  ) {
    updatedState = achievementReducer(state, action);
  } else if (
    action.type === "INCREASE_HEAT" || 
    action.type === "REDUCE_HEAT" ||
    action.type === "UPDATE_POLICE_ACTIVITY" ||
    action.type === "ATTEMPT_BRIBE" ||
    action.type === "START_POLICE_ENCOUNTER" ||
    action.type === "RESOLVE_POLICE_ENCOUNTER"
  ) {
    updatedState = policeReducer(state, action);
  } else if (
    action.type === "ADD_MONEY" || 
    action.type === "REMOVE_MONEY" ||
    action.type === "UPDATE_REPUTATION" ||
    action.type === "GAME_OVER"
  ) {
    // Handle generic actions directly in main reducer
    switch (action.type) {
      case "ADD_MONEY":
        updatedState = {
          ...state,
          money: state.money + action.amount,
          stats: {
            ...state.stats,
            totalMoneyEarned: state.stats.totalMoneyEarned + action.amount
          }
        };
        break;
        
      case "REMOVE_MONEY":
        updatedState = {
          ...state,
          money: Math.max(0, state.money - action.amount),
        };
        break;
        
      case "UPDATE_REPUTATION":
        updatedState = {
          ...state,
          reputations: state.reputations.map(rep =>
            rep.cityId === action.cityId
              ? {
                  ...rep,
                  level: Math.max(-100, Math.min(100, rep.level + action.amount)),
                }
              : rep
          ),
        };
        break;
        
      case "GAME_OVER":
        updatedState = {
          ...state,
          gameOver: true,
        };
        break;
    }
  }
  
  // Update achievements after state changes
  updatedState.achievements = updateAchievements(updatedState);
  
  return updatedState;
};
