
import { MarketEvent } from "../../../types/game";
import { DRUGS } from "../../../constants/gameData";

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: "market_crash",
    type: "crash",
    description: "Market crash! Prices are dropping drastically!",
    affectedDrugs: DRUGS.map(d => d.id),
    multiplier: 0.5,
    duration: 60000,
  },
  {
    id: "drug_shortage",
    type: "shortage",
    description: "Supply shortage! Prices are skyrocketing!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 2.0,
    duration: 45000,
  },
  {
    id: "local_surplus",
    type: "surplus",
    description: "Local surplus! Great deals available!",
    affectedDrugs: [DRUGS[Math.floor(Math.random() * DRUGS.length)].id],
    multiplier: 0.7,
    duration: 30000,
  },
];
