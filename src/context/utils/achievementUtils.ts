
import { GameState, Achievement } from "../../types/game";

// Check and update achievements
export const updateAchievements = (state: GameState): Achievement[] => {
  return state.achievements.map(achievement => {
    // Skip already completed achievements
    if (achievement.completed) return achievement;
    
    let currentProgress = achievement.progress;
    
    // Update progress based on achievement type
    switch(achievement.id) {
      case 'deal_master':
        currentProgress = state.stats.dealsCompleted;
        break;
      case 'world_traveler':
        currentProgress = state.stats.citiesVisited.length;
        break;
      case 'combat_expert':
        currentProgress = state.stats.fightswon;
        break;
      case 'heat_master':
        currentProgress = state.wantedLevel >= 3 ? 1 : 0;
        break;
      case 'millionaire':
        currentProgress = state.money;
        break;
      case 'workout_king':
        currentProgress = state.stats.trainingSessionsCompleted;
        break;
    }
    
    // Check if achievement is completed
    const completed = currentProgress >= achievement.requirement;
    
    return {
      ...achievement,
      progress: currentProgress,
      completed: completed
    };
  });
};
