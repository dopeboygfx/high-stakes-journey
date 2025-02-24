import { City, Drug, Vehicle } from "../types/game";

export const INITIAL_MONEY = 10000;
export const MAX_HEAT = 100;
export const BASE_TRAVEL_SPEED = 20; // Reduced from 100 to make travel times longer

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
    price: 500,
    speed: 2,
    description: "Cheap and reliable",
  },
  {
    id: "car",
    name: "Used Car",
    price: 5000,
    speed: 4,
    description: "Standard transportation",
  },
  {
    id: "sportscar",
    name: "Sports Car",
    price: 50000,
    speed: 8,
    description: "Fast and stylish",
  },
];

export const DRUGS: Drug[] = [
  { id: "weed", name: "Weed", basePrice: 100, volatility: 0.3 },
  { id: "cocaine", name: "Cocaine", basePrice: 1000, volatility: 0.5 },
  { id: "lsd", name: "LSD", basePrice: 200, volatility: 0.4 },
  { id: "shrooms", name: "Shrooms", basePrice: 150, volatility: 0.3 },
  { id: "ecstasy", name: "Ecstasy", basePrice: 300, volatility: 0.4 },
];

export const CITIES: City[] = [
  {
    id: "miami",
    name: "Miami",
    description: "Sun-soaked beaches and neon nights",
    availableDrugs: DRUGS.slice(0, 3),
    priceMultiplier: 1.2,
    coordinates: { x: 0, y: 0 },
  },
  {
    id: "ny",
    name: "New York",
    description: "The city that never sleeps",
    availableDrugs: DRUGS.slice(1, 4),
    priceMultiplier: 1.5,
    coordinates: { x: 100, y: 200 },
  },
  {
    id: "la",
    name: "Los Angeles",
    description: "City of angels and dreams",
    availableDrugs: DRUGS.slice(2, 5),
    priceMultiplier: 1.3,
    coordinates: { x: -200, y: 50 },
  },
];
