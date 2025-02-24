
import { MarketEvent, Ability, Reputation } from "../types/game";
import { calculateCityPrice } from "./gameUtils";

export const calculateFinalPrice = (
  basePrice: number,
  volatility: number,
  cityMultiplier: number,
  drugId: string,
  activeEvents: MarketEvent[],
  abilities: Ability[],
  cityId: string,
  reputations: Reputation[]
) => {
  let finalMultiplier = 1;
  const initialPrice = calculateCityPrice(basePrice, volatility, cityMultiplier);
  
  // Apply market events
  activeEvents.forEach(event => {
    if (event.affectedDrugs.includes(drugId)) {
      finalMultiplier *= event.multiplier;
    }
  });
  
  // Apply reputation bonus if ability is unlocked
  const hasLocalConnections = abilities.find(
    a => a.id === "local_connect" && a.unlocked
  );
  
  if (hasLocalConnections) {
    const cityRep = reputations.find(r => r.cityId === cityId);
    if (cityRep && cityRep.level > 0) {
      finalMultiplier *= (1 - (cityRep.level / 100) * hasLocalConnections.magnitude);
    }
  }
  
  return Math.round(initialPrice * finalMultiplier);
};
