
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

export type GameState = {
  money: number;
  currentCity: string;
  inventory: Inventory[];
  heat: number;
  gameOver: boolean;
  currentVehicle: string;
  isTraveling: boolean;
};
