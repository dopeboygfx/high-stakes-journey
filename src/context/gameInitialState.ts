
import { GameState, Ability, PlayerStats } from "../types/game";
import { INITIAL_MONEY, CITIES } from "../constants/gameData";

export const INITIAL_ABILITIES: Ability[] = [
  {
    id: "local_connect",
    name: "Local Connections",
    description: "Get better prices in cities where you have high reputation",
    cost: 5000,
    effect: "PRICE_DISCOUNT",
    magnitude: 0.1,
    unlocked: false,
  },
  {
    id: "smooth_talk",
    name: "Smooth Talker",
    description: "Reduce heat gain from traveling",
    cost: 8000,
    effect: "HEAT_REDUCTION",
    magnitude: 0.2,
    unlocked: false,
  },
  {
    id: "fast_travel",
    name: "Expert Navigator",
    description: "Increase travel speed by 20%",
    cost: 12000,
    effect: "TRAVEL_SPEED",
    magnitude: 0.2,
    unlocked: false,
  },
  {
    id: "extra_space",
    name: "Hidden Compartments",
    description: "Carry more inventory without increasing heat",
    cost: 15000,
    effect: "INVENTORY_SIZE",
    magnitude: 0.3,
    unlocked: false,
  },
];

export const INITIAL_PLAYER_STATS: PlayerStats = {
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  strength: 5,
  defense: 5,
  speed: 5,
  energy: 10,
  maxEnergy: 10,
  awake: 10000, // Initial awake value
};

export const initialState: GameState = {
  money: INITIAL_MONEY,
  currentCity: CITIES[0].id,
  inventory: [],
  heat: 0,
  gameOver: false,
  currentVehicle: "feet",
  isTraveling: false,
  reputations: CITIES.map(city => ({ cityId: city.id, level: 0 })),
  abilities: INITIAL_ABILITIES,
  policeActivity: CITIES.map(city => ({
    cityId: city.id,
    level: 0,
    isInvestigating: false
  })),
  wantedLevel: 0,
  bribeAttempts: 0,
  activeMarketEvents: [],
  cities: CITIES,
  playerStats: INITIAL_PLAYER_STATS,
  onlinePlayers: [],
};
