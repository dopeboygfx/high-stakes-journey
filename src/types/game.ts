export type Drug = {
  id: string;
  name: string;
  basePrice: number;
  volatility: number;
};

export type Consumable = {
  id: string;
  name: string;
  description: string;
  price: number;
  effect: 'RESTORE_AWAKE' | 'RESTORE_ENERGY' | 'BOOST_STRENGTH' | 'BOOST_DEFENSE' | 'BOOST_SPEED';
  magnitude: number; // For awake/energy: percentage to restore. For boosts: flat amount to add
};

export type Crime = {
  id: string;
  name: string;
  description: string;
  nerveRequired: number;
  moneyGain: number;
  expGain: number;
  requiredLevel?: number;
  requiresMastery?: boolean;
  cityRestriction?: string;
  successRate: number;
  cooldown: number; // in milliseconds
  lastAttempted?: number;
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
  levelRequirement?: number; // New field for level requirement
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

export type ConsumableInventory = {
  consumableId: string;
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

export type PlayerStats = {
  level: number;
  exp: number;
  expToNextLevel: number;
  strength: number;
  defense: number;
  speed: number;
  energy: number;
  maxEnergy: number;
  awake: number; // New attribute for determining optimal training levels
  nerve: number; // New stat for crimes
  maxNerve: number; // Maximum nerve capacity
  lastNerveRegen: number; // Timestamp for last nerve regeneration
};

export type OnlinePlayer = {
  id: string;
  name: string;
  cityId: string;
  stats: PlayerStats;
  lastActive: number;
};

export type CombatResult = {
  winner: string;
  expGained: number;
  moneyGained: number;
  description: string;
};

export type PoliceEncounter = {
  id: string;
  title: string;
  description: string;
  options: {
    text: string;
    outcome: 'bribe' | 'flee' | 'fight' | 'surrender';
    successChance: number;
    heatChange: number;
    moneyChange: number;
    energyCost: number;
    requiredAttribute?: {
      type: 'strength' | 'defense' | 'speed';
      value: number;
    };
  }[];
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
  reward: {
    type: 'money' | 'exp' | 'reputation' | 'attribute';
    amount: number;
    target?: string;
  };
};

export type CrimeResult = {
  success: boolean;
  message: string;
  moneyGained: number;
  expGained: number;
  nerveUsed: number;
};

export type GameState = {
  money: number;
  currentCity: string;
  inventory: Inventory[];
  consumables: ConsumableInventory[];
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
  cities: City[];
  playerStats: PlayerStats;
  onlinePlayers: OnlinePlayer[];
  lastCombat?: CombatResult;
  achievements: Achievement[];
  activePoliceEncounter?: PoliceEncounter;
  availableCrimes: Crime[];
  lastCrimeResult?: CrimeResult;
  stats: {
    dealsCompleted: number;
    citiesVisited: string[];
    fightswon: number;
    totalMoneyEarned: number;
    trainingSessionsCompleted: number;
    crimesCompleted: number;
    successfulCrimes: number;
  };
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
  | { type: "GAIN_EXP"; amount: number }
  | { type: "TRAIN_ATTRIBUTE"; attribute: "strength" | "defense" | "speed"; amount: number }
  | { type: "RESTORE_ENERGY"; amount: number }
  | { type: "RESTORE_AWAKE"; amount: number }
  | { type: "BUY_CONSUMABLE"; consumableId: string; quantity: number }
  | { type: "USE_CONSUMABLE"; consumableId: string }
  | { type: "FIGHT_PLAYER"; targetId: string }
  | { type: "UPDATE_ONLINE_PLAYERS"; players: OnlinePlayer[] }
  | { type: "GAME_OVER" }
  | { type: "UPDATE_ACHIEVEMENT_PROGRESS"; achievementId: string; progress: number }
  | { type: "CLAIM_ACHIEVEMENT"; achievementId: string }
  | { type: "START_POLICE_ENCOUNTER"; encounter: PoliceEncounter }
  | { type: "RESOLVE_POLICE_ENCOUNTER"; outcomeIndex: number }
  | { type: "INCREASE_MAX_ENERGY"; amount: number }
  | { type: "BOOST_ATTRIBUTE"; attribute: "strength" | "defense" | "speed"; amount: number }
  | { type: "RECORD_STAT"; statType: "dealsCompleted" | "fightswon" | "trainingSessionsCompleted" | "totalMoneyEarned"; value: number }
  | { type: "COMMIT_CRIME"; crimeId: string }
  | { type: "REGENERATE_NERVE" };
