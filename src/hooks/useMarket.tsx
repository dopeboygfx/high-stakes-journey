
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { useGame } from "../context/GameContext";
import { MARKET_EVENTS } from "../components/game/market/marketEvents";
import { calculateFinalPrice } from "../utils/marketUtils";
import { CITIES } from "../constants/gameData";

export const useMarket = (cityId: string) => {
  const { state, dispatch } = useGame();
  const [cityPrices, setCityPrices] = useState<Record<string, number>>({});

  const currentCity = state.currentCity === cityId;
  const cityData = state.cities.find(city => city.id === cityId)!;
  const playerLevel = state.playerStats.level;
  const cityLevelRequirement = cityData.levelRequirement || 1;
  const canAccessCity = playerLevel >= cityLevelRequirement;

  // Handle market events
  useEffect(() => {
    if (!currentCity) return;

    const eventInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
        dispatch({ type: "ADD_MARKET_EVENT", event: { ...event } });
        
        let EventIcon = AlertTriangle;
        if (event.type === "crash") {
          EventIcon = TrendingDown;
        } else if (event.type === "shortage") {
          EventIcon = TrendingUp;
        }
        
        const toastContent = (
          <div className="flex items-center gap-2">
            <EventIcon className="w-4 h-4" />
            <span>{event.description}</span>
          </div>
        );
        
        toast.info(toastContent);
      }
    }, 30000);

    return () => clearInterval(eventInterval);
  }, [currentCity, dispatch]);

  // Update prices when relevant state changes OR when a player visits
  // by using a unique key based on a timestamp when prices should be recalculated
  const [priceUpdateKey, setPriceUpdateKey] = useState(Date.now());
  
  // Force price update when component mounts or when relevant events occur
  useEffect(() => {
    setPriceUpdateKey(Date.now());
  }, []);
  
  // Update prices when relevant state changes
  useEffect(() => {
    const newPrices: Record<string, number> = {};
    cityData.availableDrugs.forEach((drug) => {
      newPrices[drug.id] = calculateFinalPrice(
        drug.basePrice,
        drug.volatility,
        cityData.priceMultiplier,
        drug.id,
        state.activeMarketEvents,
        state.abilities,
        cityId,
        state.reputations,
        priceUpdateKey // Add this key to ensure prices remain consistent
      );
    });
    setCityPrices(newPrices);
  }, [
    cityData,
    cityId,
    state.activeMarketEvents,
    state.abilities,
    state.reputations,
    priceUpdateKey // Add this to dependencies
  ]);

  const handleBuyDrug = useCallback((drugId: string, quantity: number = 1) => {
    if (!canAccessCity) {
      toast.error(`You need to be level ${cityLevelRequirement} to trade in ${cityData.name}`);
      return;
    }
    
    const price = cityPrices[drugId];
    const maxAffordable = Math.floor(state.money / price);
    const actualQuantity = quantity === -1 ? maxAffordable : quantity;

    if (actualQuantity <= 0) {
      toast.error("Not enough money!");
      return;
    }
    
    const totalCost = price * actualQuantity;
    if (state.money < totalCost) {
      toast.error("Not enough money!");
      return;
    }
    
    // Police risk check
    if (Math.random() < state.heat / 200) {
      const policeChance = Math.random();
      if (policeChance < 0.3) {
        toast.error("Police raid! You lost the drugs and some money!");
        dispatch({ type: "REMOVE_MONEY", amount: totalCost / 2 });
        return;
      }
    }
    
    // Lock prices for a short period to prevent exploits
    dispatch({ type: "LOCK_PRICES" });
    setTimeout(() => {
      dispatch({ type: "UNLOCK_PRICES" });
    }, 10000); // 10 second cooldown on price changes
    
    dispatch({ type: "BUY_DRUG", drugId, quantity: actualQuantity, cost: totalCost });
    toast.success(`Bought ${actualQuantity} units!`);

    if (actualQuantity > 10) {
      dispatch({ type: "INCREASE_HEAT" });
    }
  }, [cityPrices, state.money, state.heat, dispatch, canAccessCity, cityLevelRequirement, cityData.name]);

  const handleSellDrug = useCallback((drugId: string, quantity: number = 1) => {
    if (!canAccessCity) {
      toast.error(`You need to be level ${cityLevelRequirement} to trade in ${cityData.name}`);
      return;
    }
    
    const inventory = state.inventory.find((item) => item.drugId === drugId);
    if (!inventory || inventory.quantity === 0) {
      toast.error("No inventory to sell!");
      return;
    }

    const actualQuantity = quantity === -1 ? inventory.quantity : Math.min(quantity, inventory.quantity);
    const price = cityPrices[drugId];
    const totalProfit = price * actualQuantity;
    
    if (Math.random() < state.heat / 150) {
      toast.error("Suspicious activity reported!");
      dispatch({ type: "INCREASE_HEAT" });
    }
    
    // Lock prices for a short period to prevent exploits
    dispatch({ type: "LOCK_PRICES" });
    setTimeout(() => {
      dispatch({ type: "UNLOCK_PRICES" });
    }, 10000); // 10 second cooldown on price changes
    
    dispatch({ type: "SELL_DRUG", drugId, quantity: actualQuantity, profit: totalProfit });
    toast.success(`Sold ${actualQuantity} units!`);

    if (actualQuantity <= 5 && state.heat > 0) {
      dispatch({ type: "REDUCE_HEAT" });
    }
  }, [cityPrices, state.inventory, state.heat, dispatch, canAccessCity, cityLevelRequirement, cityData.name]);

  const cityPolice = state.policeActivity.find(p => p.cityId === cityId);
  const isHighRisk = cityPolice?.isInvestigating || state.heat > 75;

  return {
    prices: cityPrices,
    isHighRisk,
    buyDrug: handleBuyDrug,
    sellDrug: handleSellDrug,
  };
};
