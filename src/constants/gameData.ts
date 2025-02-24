
import { City, Drug, Vehicle } from "../types/game";

export const INITIAL_MONEY = 2500; // Slightly increased to give more starting options
export const MAX_HEAT = 100;
export const BASE_TRAVEL_SPEED = 12; // Slowed down slightly to make distances matter more

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
    price: 800,
    speed: 1.8,
    description: "Cheap and reliable",
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    price: 4000,
    speed: 2.8,
    description: "Fast and agile",
  },
  {
    id: "car",
    name: "Used Car",
    price: 12000,
    speed: 3.5,
    description: "Standard transportation",
  },
  {
    id: "sportscar",
    name: "Sports Car",
    price: 45000,
    speed: 4.5,
    description: "Fast and stylish",
  },
  {
    id: "helicopter",
    name: "Helicopter",
    price: 180000,
    speed: 7,
    description: "Ultimate speed and mobility",
  },
];

export const DRUGS: Drug[] = [
  { id: "weed", name: "Weed", basePrice: 75, volatility: 0.4 },
  { id: "cocaine", name: "Cocaine", basePrice: 2000, volatility: 0.6 },
  { id: "lsd", name: "LSD", basePrice: 400, volatility: 0.5 },
  { id: "shrooms", name: "Shrooms", basePrice: 150, volatility: 0.35 },
  { id: "ecstasy", name: "Ecstasy", basePrice: 500, volatility: 0.45 },
];

export const CITIES: City[] = [
  {
    id: "miami",
    name: "Miami",
    description: "Sun-soaked beaches and neon nights",
    availableDrugs: [DRUGS[0], DRUGS[1]], // Weed and Cocaine
    priceMultiplier: 1.3, // Increased multiplier
    coordinates: { x: 0, y: 0 },
  },
  {
    id: "ny",
    name: "New York",
    description: "The city that never sleeps",
    availableDrugs: [DRUGS[2], DRUGS[4]], // LSD and Ecstasy
    priceMultiplier: 1.7, // Higher prices in NY
    coordinates: { x: 120, y: 200 }, // Adjusted distance
  },
  {
    id: "la",
    name: "Los Angeles",
    description: "City of angels and dreams",
    availableDrugs: [DRUGS[0], DRUGS[3]], // Weed and Shrooms
    priceMultiplier: 1.4,
    coordinates: { x: -250, y: 50 }, // Increased distance
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "The Windy City",
    availableDrugs: [DRUGS[1], DRUGS[4]], // Cocaine and Ecstasy
    priceMultiplier: 1.5,
    coordinates: { x: 80, y: 150 },
  },
  {
    id: "vegas",
    name: "Las Vegas",
    description: "Sin City",
    availableDrugs: [DRUGS[2], DRUGS[3]], // LSD and Shrooms
    priceMultiplier: 1.8, // Highest prices
    coordinates: { x: -180, y: -80 }, // Adjusted for better route planning
  }
];
