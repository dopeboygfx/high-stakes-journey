
export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  progress: number;
  completed: boolean;
  claimed: boolean; // Added this field to match the game.ts type
  reward: {
    type: 'money' | 'exp' | 'reputation' | 'attribute';
    amount: number;
    target?: string; // For specific attributes or city reputation
  };
};
