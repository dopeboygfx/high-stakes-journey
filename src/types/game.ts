
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
  coordinates: {
    x: number;
    y: number;
  };
};

export type Vehicle = {
  id: string;
  name: string;
  price: number;
  speed: number;
  description: string;
};

export type Inventory = {
  drugId: string;
  quantity: number;
};

export type GameEvent = {
  type: 'police' | 'dealer' | 'lucky';
  description: string;
  effect: number;
};

export type Reputation = {
  cityId: string;
  level: number; // -100 to 100
};

export type Ability = {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: 'PRICE_DISCOUNT' | 'HEAT_REDUCTION' | 'TRAVEL_SPEED' | 'INVENTORY_SIZE';
  magnitude: number;
  unlocked: boolean;
};

export type GameState = {
  money: number;
  currentCity: string;
  inventory: Inventory[];
  heat: number;
  gameOver: boolean;
  currentVehicle: string;
  isTraveling: boolean;
  lastEvent?: GameEvent;
  reputations: Reputation[];
  abilities: Ability[];
};
