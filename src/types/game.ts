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

export type PoliceActivity = {
  cityId: string;
  level: number; // 0-100
  isInvestigating: boolean;
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

export type MarketEvent = {
  id: string;
  type: 'crash' | 'boom' | 'shortage' | 'surplus';
  description: string;
  affectedDrugs: string[];
  multiplier: number;
  duration: number; // in milliseconds
  startTime?: number;
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
  policeActivity: PoliceActivity[];
  wantedLevel: number; // 0-5 stars
  bribeAttempts: number;
  activeMarketEvents: MarketEvent[];
};

export type GameAction =
  | { type: "BUY_DRUG"; drugId: string; quantity: number; cost: number }
  | { type: "SELL_DRUG"; drugId: string; quantity: number; profit: number }
  | { type: "TRAVEL_TO_CITY"; cityId: string }
  | { type: "SET_TRAVELING"; isTraveling: boolean }
  | { type: "BUY_VEHICLE"; vehicleId: string }
  | { type: "INCREASE_HEAT" }
  | { type: "REDUCE_HEAT" }
  | { type: "ADD_MONEY"; amount: number }
  | { type: "REMOVE_MONEY"; amount: number }
  | { type: "UNLOCK_ABILITY"; abilityId: string }
  | { type: "UPDATE_REPUTATION"; cityId: string; amount: number }
  | { type: "UPDATE_POLICE_ACTIVITY"; cityId: string }
  | { type: "ATTEMPT_BRIBE"; amount: number }
  | { type: "ADD_MARKET_EVENT"; event: MarketEvent }
  | { type: "REMOVE_MARKET_EVENT"; eventId: string }
  | { type: "GAME_OVER" };
