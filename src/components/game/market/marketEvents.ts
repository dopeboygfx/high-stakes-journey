
import { MarketEvent } from "../../../types/game";
import { DRUGS } from "../../../constants/gameData";

// Create more balanced market events
export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "drug_bust",
    type: "shortage",
    description: "Major drug bust! Suppliers are laying low!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 2.2, // Slightly reduced for better balance
    duration: 60000, // 1 minute
  },
  {
    id: "police_raid",
    type: "shortage",
    description: "Police raid took out a major supplier!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 1.8, // More balanced multiplier
    duration: 45000, // 45 seconds
  },
  {
    id: "market_saturation",
    type: "surplus",
    description: "Market flooded with product! Prices dropping!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 0.65, // Not as extreme drop
    duration: 30000, // 30 seconds
  },
  {
    id: "gang_warfare",
    type: "shortage",
    description: "Gang warfare disrupted supply chains!",
    affectedDrugs: DRUGS.map(d => d.id),
    multiplier: 1.5, // Reduced multiplier since it affects all drugs
    duration: 50000, // 50 seconds
  },
  {
    id: "new_supplier",
    type: "surplus",
    description: "New supplier in town flooding the market!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 0.7, // Balanced for better gameplay
    duration: 40000, // 40 seconds
  },
  {
    id: "festival_demand",
    type: "shortage",
    description: "Major festival in town! Demand is skyrocketing!",
    affectedDrugs: [DRUGS[2].id, DRUGS[4].id], // LSD and Ecstasy
    multiplier: 1.9, // Higher prices for party drugs
    duration: 55000, // 55 seconds
  },
  {
    id: "lab_bust",
    type: "shortage",
    description: "Major lab busted! Synthetic drugs in short supply!",
    affectedDrugs: [DRUGS[1].id, DRUGS[2].id], // Cocaine and LSD
    multiplier: 2.0, // Significant price increase
    duration: 65000, // 65 seconds
  }
];
