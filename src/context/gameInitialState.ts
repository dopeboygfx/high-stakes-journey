
import { GameState, Ability, PlayerStats, Achievement } from "../types/game";
import { INITIAL_MONEY, CITIES } from "../constants/gameData";
import { ACHIEVEMENTS } from "../constants/achievementData";

export const INITIAL_ABILITIES: Ability[] = [
  {
    id: "local_connect",
    name: "Local Connections",
    description: "Get better prices in cities where you have high reputation",
    cost: 4000, // Reduced for better early game
    effect: "PRICE_DISCOUNT",
    magnitude: 0.12, // Slightly improved effect
    unlocked: false,
  },
  {
    id: "smooth_talk",
    name: "Smooth Talker",
    description: "Reduce heat gain from traveling",
    cost: 7000, // More balanced pricing curve
    effect: "HEAT_REDUCTION",
    magnitude: 0.25, // Better effect to make it worth it
    unlocked: false,
  },
  {
    id: "fast_travel",
    name: "Expert Navigator",
    description: "Increase travel speed by 25%",
    cost: 10000, // More balanced for mid-game
    effect: "TRAVEL_SPEED",
    magnitude: 0.25, // Increased effect
    unlocked: false,
  },
  {
    id: "extra_space",
    name: "Hidden Compartments",
    description: "Carry more inventory without increasing heat",
    cost: 12000, // More balanced for progression
    effect: "INVENTORY_SIZE",
    magnitude: 0.35, // Improved effect
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
  consumables: [], // Fixed the missing consumables array
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
  achievements: ACHIEVEMENTS,
  stats: {
    dealsCompleted: 0,
    citiesVisited: [CITIES[0].id],
    fightswon: 0,
    totalMoneyEarned: 0,
    trainingSessionsCompleted: 0
  }
};
