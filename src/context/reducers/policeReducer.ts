
import { GameState, GameAction } from "../../types/game";
import { toast } from "sonner";

export const policeReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "INCREASE_HEAT":
      return {
        ...state,
        heat: Math.min(state.heat + 10, 100),
        wantedLevel: state.heat >= 90 ? Math.min(state.wantedLevel + 1, 5) : state.wantedLevel,
      };
      
    case "REDUCE_HEAT":
      return {
        ...state,
        heat: Math.max(0, state.heat - 5),
      };
      
    case "UPDATE_POLICE_ACTIVITY":
      return {
        ...state,
        policeActivity: state.policeActivity.map(activity =>
          activity.cityId === action.cityId
            ? {
                ...activity,
                level: Math.min(activity.level + 10, 100),
                isInvestigating: activity.level >= 80,
              }
            : activity
        ),
      };
      
    case "ATTEMPT_BRIBE": {
      const success = Math.random() < 0.6 - (state.bribeAttempts * 0.1);
      return {
        ...state,
        money: state.money - action.amount,
        heat: success ? Math.max(0, state.heat - 30) : state.heat + 20,
        bribeAttempts: state.bribeAttempts + 1,
        wantedLevel: success ? Math.max(0, state.wantedLevel - 1) : state.wantedLevel,
      };
    }
      
    case "START_POLICE_ENCOUNTER": {
      return {
        ...state,
        activePoliceEncounter: action.encounter
      };
    }
    
    case "RESOLVE_POLICE_ENCOUNTER": {
      if (!state.activePoliceEncounter) return state;
      
      const option = state.activePoliceEncounter.options[action.outcomeIndex];
      const success = Math.random() < option.successChance;
      
      // Apply outcome effects
      let heatChange = option.heatChange;
      let moneyChange = option.moneyChange;
      
      if (!success) {
        // Failed attempt has worse outcomes
        heatChange = option.outcome === 'surrender' ? 15 : 30; // Always increase heat on failure
        moneyChange = option.outcome === 'bribe' ? option.moneyChange : -500; // Lose money on failed non-bribe
      }
      
      const newState = {
        ...state,
        activePoliceEncounter: undefined,
        heat: Math.max(0, Math.min(100, state.heat + heatChange)),
        money: Math.max(0, state.money + moneyChange),
        playerStats: {
          ...state.playerStats,
          energy: Math.max(0, state.playerStats.energy - option.energyCost)
        },
        wantedLevel: success && heatChange < 0 
          ? Math.max(0, state.wantedLevel - 1) // Reduce wanted level on successful de-escalation
          : !success && option.outcome !== 'surrender'
            ? Math.min(5, state.wantedLevel + 1) // Increase wanted level on failed aggressive action
            : state.wantedLevel
      };
      
      // Show outcome message
      if (success) {
        switch(option.outcome) {
          case 'bribe':
            toast.success("The officer accepted your bribe and let you go!");
            break;
          case 'flee':
            toast.success("You managed to escape!");
            break;
          case 'fight':
            toast.success("You overpowered the officers and escaped!");
            break;
          case 'surrender':
            toast.success("The officers believed your story and let you go with a warning.");
            break;
        }
      } else {
        switch(option.outcome) {
          case 'bribe':
            toast.error("The officer rejected your bribe and increased your wanted level!");
            break;
          case 'flee':
            toast.error("Your escape attempt failed! Your heat has increased.");
            break;
          case 'fight':
            toast.error("You couldn't overpower the officers. Your wanted level increased!");
            break;
          case 'surrender':
            toast.error("The officers didn't believe your story but let you go with a fine.");
            break;
        }
      }
      
      return newState;
    }
    
    default:
      return state;
  }
};
