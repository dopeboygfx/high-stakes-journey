
export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  progress: number;
  completed: boolean;
  reward: {
    type: 'money' | 'exp' | 'reputation' | 'attribute';
    amount: number;
    target?: string; // For specific attributes or city reputation
  };
};
