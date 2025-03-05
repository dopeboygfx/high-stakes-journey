
import { Achievement } from "../types/achievements";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "deal_master",
    name: "Deal Master",
    description: "Complete 50 drug deals",
    icon: "coins",
    requirement: 50,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'money',
      amount: 5000
    }
  },
  {
    id: "world_traveler",
    name: "World Traveler",
    description: "Visit all cities",
    icon: "map",
    requirement: 5,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'exp',
      amount: 200
    }
  },
  {
    id: "combat_expert",
    name: "Combat Expert",
    description: "Win 10 fights",
    icon: "swords",
    requirement: 10,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'attribute',
      amount: 2,
      target: 'strength'
    }
  },
  {
    id: "heat_master",
    name: "Heat Master",
    description: "Reach wanted level 3 and escape",
    icon: "flame",
    requirement: 1,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'reputation',
      amount: 20,
      target: 'miami'
    }
  },
  {
    id: "millionaire",
    name: "Millionaire",
    description: "Accumulate $1,000,000",
    icon: "banknote",
    requirement: 1000000,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'exp',
      amount: 500
    }
  },
  {
    id: "workout_king",
    name: "Workout King",
    description: "Train 50 times",
    icon: "dumbbell",
    requirement: 50,
    progress: 0,
    completed: false,
    claimed: false,
    reward: {
      type: 'attribute',
      amount: 3,
      target: 'maxEnergy'
    }
  }
];
