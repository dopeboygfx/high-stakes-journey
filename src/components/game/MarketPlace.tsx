
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Pill, Cannabis, FlaskConical, Wine, Candy, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { calculateCityPrice } from "../../utils/gameUtils";
import { MarketEvents } from "./MarketEvents";
import { DrugCard } from "./market/DrugCard";
import { MarketHeader } from "./market/MarketHeader";
import { MARKET_EVENTS } from "./market/marketEvents";

const drugIcons: Record<string, any> = {
  weed: Cannabis,
  cocaine: Pill,
  lsd: FlaskConical,
  shrooms: Wine,
  ecstasy: Candy,
};

export const MarketPlace = () => {
  const { state, dispatch } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  const [cityPrices, setCityPrices] = useState<Record<string, number>>({});

  // Generate random market events
  useEffect(() => {
    const eventInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
        dispatch({ type: "ADD_MARKET_EVENT", event: { ...event } });
        
        const EventIcon = event.type === "crash" ? TrendingDown : 
                         event.type === "shortage" ? TrendingUp : 
                         AlertTriangle;
        
        toast.info(
          <div className="flex items-center gap-2">
            <EventIcon className="w-4 h-4" />
            <span>{event.description}</span>
          </div>
        );
      }
    }, 30000);

    return () => clearInterval(eventInterval);
  }, [dispatch]);

  const calculateFinalPrice = useCallback((basePrice: number, drugId: string) => {
    let finalMultiplier = 1;
    
    // Apply market events
    state.activeMarketEvents.forEach(event => {
      if (event.affectedDrugs.includes(drugId)) {
        finalMultiplier *= event.multiplier;
      }
    });
    
    // Apply reputation bonus if ability is unlocked
    const hasLocalConnections = state.abilities.find(
      a => a.id === "local_connect" && a.unlocked
    );
    
    if (hasLocalConnections) {
      const cityRep = state.reputations.find(r => r.cityId === currentCity.id);
      if (cityRep && cityRep.level > 0) {
        finalMultiplier *= (1 - (cityRep.level / 100) * hasLocalConnections.magnitude);
      }
    }
    
    return Math.round(basePrice * finalMultiplier);
  }, [currentCity.id, state.abilities, state.activeMarketEvents, state.reputations]);

  useEffect(() => {
    const newPrices: Record<string, number> = {};
    currentCity.availableDrugs.forEach((drug) => {
      const basePrice = calculateCityPrice(
        drug.basePrice,
        drug.volatility,
        currentCity.priceMultiplier
      );
      newPrices[drug.id] = calculateFinalPrice(basePrice, drug.id);
    });
    setCityPrices(newPrices);
  }, [currentCity, calculateFinalPrice]);

  const handleBuyDrug = (drugId: string, quantity: number = 1) => {
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
    
    dispatch({ type: "BUY_DRUG", drugId, quantity: actualQuantity, cost: totalCost });
    toast.success(`Bought ${actualQuantity} units!`);

    if (actualQuantity > 10) {
      dispatch({ type: "INCREASE_HEAT" });
    }
  };

  const handleSellDrug = (drugId: string, quantity: number = 1) => {
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
    
    dispatch({ type: "SELL_DRUG", drugId, quantity: actualQuantity, profit: totalProfit });
    toast.success(`Sold ${actualQuantity} units!`);

    if (actualQuantity <= 5 && state.heat > 0) {
      dispatch({ type: "REDUCE_HEAT" });
    }
  };

  const cityPolice = state.policeActivity.find(p => p.cityId === currentCity.id);
  const isHighRisk = cityPolice?.isInvestigating || state.heat > 75;

  return (
    <div className="space-y-4">
      <MarketHeader isHighRisk={isHighRisk} />
      <MarketEvents />
      <div className="grid gap-4">
        {currentCity.availableDrugs.map((drug) => {
          const DrugIcon = drugIcons[drug.id];
          const affectingEvents = state.activeMarketEvents.filter(
            event => event.affectedDrugs.includes(drug.id)
          );
          
          return (
            <DrugCard
              key={drug.id}
              drug={drug}
              price={cityPrices[drug.id] || 0}
              DrugIcon={DrugIcon}
              hasActiveEvents={affectingEvents.length > 0}
              onBuy={handleBuyDrug}
              onSell={handleSellDrug}
            />
          );
        })}
      </div>
    </div>
  );
};
