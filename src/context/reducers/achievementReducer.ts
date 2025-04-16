
import { GameState, GameAction } from "../../types/game";

export const achievementReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "UPDATE_ACHIEVEMENT_PROGRESS": {
      return {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.achievementId
            ? { 
                ...achievement, 
                progress: action.progress,
                completed: action.progress >= achievement.requirement 
              }
            : achievement
        )
      };
    }
    
    case "CLAIM_ACHIEVEMENT": {
      return {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.achievementId && achievement.completed
            ? { ...achievement, claimed: true }
            : achievement
        )
      };
    }
    
    default:
      return state;
  }
};
