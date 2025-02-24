
import { City, Drug, Vehicle } from "../types/game";

export const INITIAL_MONEY = 3000; // Increased to allow more initial strategy
export const MAX_HEAT = 100;
export const BASE_TRAVEL_SPEED = 10; // Slowed down more to make travel decisions more impactful

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
    price: 600, // More affordable first upgrade
    speed: 1.8,
    description: "Cheap and reliable",
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    price: 3500,
    speed: 3.0, // Slightly faster to differentiate from bicycle
    description: "Fast and agile",
  },
  {
    id: "car",
    name: "Used Car",
    price: 10000, // More achievable mid-game upgrade
    speed: 3.8,
    description: "Standard transportation",
  },
  {
    id: "sportscar",
    name: "Sports Car",
    price: 40000,
    speed: 5.0, // Increased speed differential
    description: "Fast and stylish",
  },
  {
    id: "helicopter",
    name: "Helicopter",
    price: 150000, // More achievable endgame goal
    speed: 8.0, // Significantly faster
    description: "Ultimate speed and mobility",
  },
];

export const DRUGS: Drug[] = [
  { id: "weed", name: "Weed", basePrice: 100, volatility: 0.35 }, // Starter drug more profitable
  { id: "cocaine", name: "Cocaine", basePrice: 2500, volatility: 0.7 }, // Higher risk/reward
  { id: "lsd", name: "LSD", basePrice: 500, volatility: 0.5 },
  { id: "shrooms", name: "Shrooms", basePrice: 200, volatility: 0.4 },
  { id: "ecstasy", name: "Ecstasy", basePrice: 800, volatility: 0.6 }, // More distinct pricing tiers
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
