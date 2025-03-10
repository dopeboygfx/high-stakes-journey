
import { CONSUMABLES, VEHICLES } from '../constants/gameData';
import { Consumable, Vehicle } from '../types/game';

// Define which consumables are available in each city
const CITY_CONSUMABLES: Record<string, string[]> = {
  // Starter city - basic items only
  'miami': ['energy_drink'],
  
  // Level 3 city - basic items + awake pill
  'ny': ['energy_drink', 'awake_pill'],
  
  // Level 5 city - energy + speed booster
  'la': ['energy_drink', 'speed_boost'],
  
  // Level 7 city - energy + strength booster
  'chicago': ['energy_drink', 'strength_boost'],
  
  // Level 10 city - high-end items only
  'vegas': ['defense_boost', 'awake_pill'],
};

// Define which vehicles are available in each city
const CITY_VEHICLES: Record<string, string[]> = {
  // Starter city - basic vehicles
  'miami': ['feet', 'bicycle'],
  
  // Level 3 city - adds motorcycle
  'ny': ['feet', 'bicycle', 'motorcycle'],
  
  // Level 5 city - adds car
  'la': ['feet', 'bicycle', 'motorcycle', 'car'],
  
  // Level 7 city - adds sports car
  'chicago': ['feet', 'motorcycle', 'car', 'sportscar'],
  
  // Level 10 city - all vehicles including helicopter
  'vegas': ['car', 'sportscar', 'helicopter'],
};

/**
 * Returns the consumables available in a specific city
 */
export const getCityConsumables = (cityId: string): Consumable[] => {
  const availableIds = CITY_CONSUMABLES[cityId] || [];
  
  // If no consumables defined for this city, return empty array
  if (!availableIds.length) {
    return [];
  }
  
  // Filter consumables by available IDs
  return CONSUMABLES.filter(consumable => availableIds.includes(consumable.id));
};

/**
 * Returns the vehicles available in a specific city
 */
export const getCityVehicles = (cityId: string): Vehicle[] => {
  const availableIds = CITY_VEHICLES[cityId] || [];
  
  // If no vehicles defined for this city, return empty array
  if (!availableIds.length) {
    return [];
  }
  
  // Filter vehicles by available IDs
  return VEHICLES.filter(vehicle => availableIds.includes(vehicle.id));
};

// Apply city-specific price modifiers to regular consumable prices
export const getCityConsumablePrice = (consumableId: string, cityId: string): number => {
  const consumable = CONSUMABLES.find(c => c.id === consumableId);
  if (!consumable) return 0;
  
  // Cities can apply discounts or price increases
  const cityPriceModifiers: Record<string, number> = {
    'miami': 1.0, // Base prices
    'ny': 1.2,    // 20% premium
    'la': 1.1,    // 10% premium
    'chicago': 0.9, // 10% discount
    'vegas': 1.5,  // 50% premium (luxury tax)
  };
  
  const modifier = cityPriceModifiers[cityId] || 1.0;
  return Math.round(consumable.price * modifier);
};
