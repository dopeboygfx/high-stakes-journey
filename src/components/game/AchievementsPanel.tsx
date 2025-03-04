
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Progress } from '../ui/progress';
import { 
  Trophy, Coins, Map, Swords, Flame, Banknote, Dumbbell 
} from 'lucide-react';
import { toast } from 'sonner';

const achievementIcons: Record<string, any> = {
  coins: Coins,
  map: Map,
  swords: Swords,
  flame: Flame,
  banknote: Banknote,
  dumbbell: Dumbbell,
};

export const AchievementsPanel = () => {
  const { state, dispatch } = useGame();
  
  const claimReward = (achievementId: string) => {
    const achievement = state.achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.completed) return;
    
    // Apply reward based on type
    const { reward } = achievement;
    switch(reward.type) {
      case 'money':
        dispatch({ type: 'ADD_MONEY', amount: reward.amount });
        toast.success(`Earned ${reward.amount}$!`);
        break;
      case 'exp':
        dispatch({ type: 'GAIN_EXP', amount: reward.amount });
        toast.success(`Earned ${reward.amount} experience!`);
        break;
      case 'reputation':
        if (reward.target) {
          dispatch({ 
            type: 'UPDATE_REPUTATION', 
            cityId: reward.target, 
            amount: reward.amount 
          });
          toast.success(`Gained reputation in ${reward.target}!`);
        }
        break;
      case 'attribute':
        if (reward.target === 'maxEnergy') {
          // Special case for maxEnergy
          dispatch({ 
            type: 'INCREASE_MAX_ENERGY', 
            amount: reward.amount 
          });
          toast.success(`Max energy increased by ${reward.amount}!`);
        } else {
          // For other attributes
          dispatch({ 
            type: 'BOOST_ATTRIBUTE', 
            attribute: reward.target as any, 
            amount: reward.amount 
          });
          toast.success(`${reward.target} increased by ${reward.amount}!`);
        }
        break;
    }
    
    // Mark as claimed
    dispatch({ type: 'CLAIM_ACHIEVEMENT', achievementId });
  };
  
  // Sort achievements - completed but unclaimed first, then by progress percentage
  const sortedAchievements = [...state.achievements].sort((a, b) => {
    if (a.completed && !a.claimed && !(b.completed && !b.claimed)) return -1;
    if (!a.completed && b.completed && !b.claimed) return 1;
    
    const aProgress = a.progress / a.requirement;
    const bProgress = b.progress / b.requirement;
    return bProgress - aProgress;
  });
  
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Achievements</h2>
        <Trophy className="h-5 w-5 text-yellow-500" />
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {sortedAchievements.map((achievement) => {
          const Icon = achievementIcons[achievement.icon] || Trophy;
          const progressPercent = Math.min(100, (achievement.progress / achievement.requirement) * 100);
          
          return (
            <div 
              key={achievement.id} 
              className={`p-3 border rounded-md ${achievement.completed && !achievement.claimed 
                ? 'border-yellow-500 bg-yellow-500/10' 
                : achievement.claimed 
                  ? 'border-green-500/30 bg-green-500/5 opacity-80' 
                  : 'bg-card/50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${achievement.completed ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                  <h3 className="font-medium text-sm">{achievement.name}</h3>
                </div>
                {achievement.completed && !achievement.claimed && (
                  <button 
                    onClick={() => claimReward(achievement.id)}
                    className="text-xs px-2 py-0.5 bg-yellow-500 text-yellow-950 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Claim
                  </button>
                )}
                {achievement.claimed && (
                  <span className="text-xs text-green-500 font-medium">Claimed</span>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              
              <div className="flex items-center gap-2">
                <Progress value={progressPercent} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {achievement.progress}/{achievement.requirement}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
