
import { City, Drug, Vehicle } from "../types/game";

export const INITIAL_MONEY = 2000; // Reduced from 10000 to make early game more challenging
export const MAX_HEAT = 100;
export const BASE_TRAVEL_SPEED = 15; // Adjusted to make travel times more balanced

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
    price: 1000,
    speed: 1.5,
    description: "Cheap and reliable",
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    price: 5000,
    speed: 2.5,
    description: "Fast and agile",
  },
  {
    id: "car",
    name: "Used Car",
    price: 15000,
    speed: 3,
    description: "Standard transportation",
  },
  {
    id: "sportscar",
    name: "Sports Car",
    price: 50000,
    speed: 4,
    description: "Fast and stylish",
  },
  {
    id: "helicopter",
    name: "Helicopter",
    price: 200000,
    speed: 6,
    description: "Ultimate speed and mobility",
  },
];

export const DRUGS: Drug[] = [
  { id: "weed", name: "Weed", basePrice: 50, volatility: 0.3 },
  { id: "cocaine", name: "Cocaine", basePrice: 1500, volatility: 0.5 },
  { id: "lsd", name: "LSD", basePrice: 300, volatility: 0.4 },
  { id: "shrooms", name: "Shrooms", basePrice: 100, volatility: 0.3 },
  { id: "ecstasy", name: "Ecstasy", basePrice: 400, volatility: 0.4 },
];

export const CITIES: City[] = [
  {
    id: "miami",
    name: "Miami",
    description: "Sun-soaked beaches and neon nights",
    availableDrugs: [DRUGS[0], DRUGS[1]], // Weed and Cocaine
    priceMultiplier: 1.2,
    coordinates: { x: 0, y: 0 },
  },
  {
    id: "ny",
    name: "New York",
    description: "The city that never sleeps",
    availableDrugs: [DRUGS[2], DRUGS[4]], // LSD and Ecstasy
    priceMultiplier: 1.5,
    coordinates: { x: 100, y: 200 },
  },
  {
    id: "la",
    name: "Los Angeles",
    description: "City of angels and dreams",
    availableDrugs: [DRUGS[0], DRUGS[3]], // Weed and Shrooms
    priceMultiplier: 1.3,
    coordinates: { x: -200, y: 50 },
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "The Windy City",
    availableDrugs: [DRUGS[1], DRUGS[4]], // Cocaine and Ecstasy
    priceMultiplier: 1.4,
    coordinates: { x: 50, y: 150 },
  },
  {
    id: "vegas",
    name: "Las Vegas",
    description: "Sin City",
    availableDrugs: [DRUGS[2], DRUGS[3]], // LSD and Shrooms
    priceMultiplier: 1.6,
    coordinates: { x: -150, y: -50 },
  }
];
