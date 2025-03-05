
import { City, Drug, Vehicle, Consumable } from "../types/game";

export const INITIAL_MONEY = 5000; // Increased for better early game experience
export const MAX_HEAT = 100;
export const BASE_TRAVEL_SPEED = 12; // Slightly increased for better pace

export const VEHICLES: Vehicle[] = [
  {
    id: "feet",
    name: "On Foot",
    price: 0,
    speed: 1,
    description: "Walking is free but slow",
  },
  {
    id: "bicycle",
    name: "Bicycle",
    price: 500, // More affordable first upgrade
    speed: 1.8,
    description: "Cheap and reliable",
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    price: 3000, // Reduced price for better early progression
    speed: 3.0,
    description: "Fast and agile",
  },
  {
    id: "car",
    name: "Used Car",
    price: 8000, // More achievable mid-game upgrade
    speed: 3.8,
    description: "Standard transportation",
  },
  {
    id: "sportscar",
    name: "Sports Car",
    price: 30000, // More balanced price progression
    speed: 5.0,
    description: "Fast and stylish",
  },
  {
    id: "helicopter",
    name: "Helicopter",
    price: 100000, // More achievable endgame goal
    speed: 8.0,
    description: "Ultimate speed and mobility",
  },
];

export const DRUGS: Drug[] = [
  { id: "weed", name: "Weed", basePrice: 150, volatility: 0.35 }, // Better starter profitability
  { id: "cocaine", name: "Cocaine", basePrice: 2000, volatility: 0.7 }, // Slightly reduced for better progression
  { id: "lsd", name: "LSD", basePrice: 500, volatility: 0.5 },
  { id: "shrooms", name: "Shrooms", basePrice: 250, volatility: 0.4 }, // Slightly better early returns
  { id: "ecstasy", name: "Ecstasy", basePrice: 800, volatility: 0.6 },
];

export const CONSUMABLES: Consumable[] = [
  {
    id: "awake_pill",
    name: "Awake Pill",
    description: "Restores alertness to 100%",
    price: 400, // Reduced to be more accessible
    effect: "RESTORE_AWAKE",
    magnitude: 100 // Restores 100% of awake
  },
  {
    id: "energy_drink",
    name: "Energy Drink",
    description: "Restores 50% of max energy",
    price: 150, // More affordable for early game
    effect: "RESTORE_ENERGY",
    magnitude: 50 // Restores 50% of max energy
  },
  {
    id: "strength_boost",
    name: "Strength Booster",
    description: "Permanently increases strength by 1",
    price: 800, // More balanced price
    effect: "BOOST_STRENGTH",
    magnitude: 1 // Adds 1 to strength
  },
  {
    id: "defense_boost",
    name: "Defense Booster",
    description: "Permanently increases defense by 1",
    price: 800, // Consistent with strength price
    effect: "BOOST_DEFENSE",
    magnitude: 1 // Adds 1 to defense
  },
  {
    id: "speed_boost",
    name: "Speed Booster",
    description: "Permanently increases speed by 1",
    price: 800, // Consistent with other attribute prices
    effect: "BOOST_SPEED",
    magnitude: 1 // Adds 1 to speed
  }
];

export const CITIES: City[] = [
  {
    id: "miami",
    name: "Miami",
    description: "Sun-soaked beaches and neon nights",
    availableDrugs: [DRUGS[0], DRUGS[1]], // Weed and Cocaine
    priceMultiplier: 1.4, // Better starter city multiplier
    coordinates: { x: 0, y: 0 },
  },
  {
    id: "ny",
    name: "New York",
    description: "The city that never sleeps",
    availableDrugs: [DRUGS[2], DRUGS[4]], // LSD and Ecstasy
    priceMultiplier: 1.8, // Premium market
    coordinates: { x: 150, y: 220 }, // Further distance
  },
  {
    id: "la",
    name: "Los Angeles",
    description: "City of angels and dreams",
    availableDrugs: [DRUGS[0], DRUGS[3]], // Weed and Shrooms
    priceMultiplier: 1.5,
    coordinates: { x: -280, y: 80 }, // Increased distance for better route planning
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "The Windy City",
    availableDrugs: [DRUGS[1], DRUGS[4]], // Cocaine and Ecstasy
    priceMultiplier: 1.6,
    coordinates: { x: 100, y: 180 },
  },
  {
    id: "vegas",
    name: "Las Vegas",
    description: "Sin City",
    availableDrugs: [DRUGS[2], DRUGS[3]], // LSD and Shrooms
    priceMultiplier: 2.0, // Highest risk/reward
    coordinates: { x: -200, y: -100 }, // More isolated location
  }
];
