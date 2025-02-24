
export type Drug = {
  id: string;
  name: string;
  basePrice: number;
  volatility: number;
};

export type City = {
  id: string;
  name: string;
  description: string;
  availableDrugs: Drug[];
  priceMultiplier: number;
};

export type Inventory = {
  drugId: string;
  quantity: number;
};

export type GameState = {
  money: number;
  currentCity: string;
  inventory: Inventory[];
  heat: number;
  gameOver: boolean;
};
