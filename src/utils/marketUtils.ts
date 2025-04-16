// Calculate the final price of a drug based on various factors
export const calculateFinalPrice = (
  basePrice: number,
  volatility: number,
  cityMultiplier: number,
  drugId: string,
  activeEvents: any[],
  abilities: any[],
  cityId: string,
  reputations: any[],
  priceKey: number = 0 // Add a key to ensure consistent pricing
): number => {
  // Use the price key to seed the random generator for consistency
  const randomSeed = (priceKey % 100000) / 100000;
  
  // Random fluctuation between -volatility% and +volatility%
  const fluctuation = (Math.sin(randomSeed * Math.PI * 2) * volatility) / 100;
  
  // Start with the base price
  let finalPrice = basePrice;
  
  // Apply fluctuation
  finalPrice = finalPrice * (1 + fluctuation);
  
  // Apply city price multiplier
  finalPrice = finalPrice * cityMultiplier;
  
  // Apply market events
  activeEvents.forEach((event) => {
    if (event.affectedDrugs.includes(drugId)) {
      finalPrice = finalPrice * event.multiplier;
    }
  });
  
  // Apply dealer ability discounts
  const dealerAbility = abilities.find((ability) => 
    ability.id === "dealer_connect" && ability.unlocked
  );
  
  if (dealerAbility) {
    finalPrice = finalPrice * (1 - dealerAbility.magnitude);
  }
  
  // Apply reputation bonuses/penalties (1% per 10 points)
  const cityRep = reputations.find((rep) => rep.cityId === cityId);
  if (cityRep) {
    const repMultiplier = 1 - (cityRep.level / 1000); // -10% to +10% based on -100 to +100 rep
    finalPrice = finalPrice * repMultiplier;
  }
  
  // Ensure minimum price and round to nearest dollar
  return Math.max(10, Math.round(finalPrice));
};
