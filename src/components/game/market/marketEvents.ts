
import { MarketEvent } from "../../../types/game";
import { DRUGS } from "../../../constants/gameData";

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "drug_bust",
    type: "shortage",
    description: "Major drug bust! Suppliers are laying low!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 2.5,
    duration: 60000,
  },
  {
    id: "police_raid",
    type: "shortage",
    description: "Police raid took out a major supplier!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 2.0,
    duration: 45000,
  },
  {
    id: "market_saturation",
    type: "surplus",
    description: "Market flooded with product! Prices dropping!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 0.6,
    duration: 30000,
  },
  {
    id: "gang_warfare",
    type: "shortage",
    description: "Gang warfare disrupted supply chains!",
    affectedDrugs: DRUGS.map(d => d.id),
    multiplier: 1.8,
    duration: 50000,
  },
  {
    id: "new_supplier",
    type: "surplus",
    description: "New supplier in town flooding the market!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 0.7,
    duration: 40000,
  }
];
