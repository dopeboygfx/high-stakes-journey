
import { City, Drug } from "../types/game";

export const INITIAL_MONEY = 10000;
export const MAX_HEAT = 100;

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
  },
  {
    id: "ny",
    name: "New York",
    description: "The city that never sleeps",
    availableDrugs: DRUGS.slice(1, 4),
    priceMultiplier: 1.5,
  },
  {
    id: "la",
    name: "Los Angeles",
    description: "City of angels and dreams",
    availableDrugs: DRUGS.slice(2, 5),
    priceMultiplier: 1.3,
  },
];
