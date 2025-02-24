
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Pill, Cannabis, Vial, Wine, Candy } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES, DRUGS } from "../../constants/gameData";
import { formatMoney, calculateCityPrice } from "../../utils/gameUtils";

// Map drug IDs to their corresponding icons
const drugIcons: Record<string, any> = {
  weed: Cannabis,
  cocaine: Pill,
  lsd: Vial,
  shrooms: Wine,
  ecstasy: Candy,
};

export const MarketPlace = () => {
  const { state, dispatch } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  const [cityPrices, setCityPrices] = useState<Record<string, number>>({});

  const initializePrices = useCallback(() => {
    const newPrices: Record<string, number> = {};
    currentCity.availableDrugs.forEach((drug) => {
      newPrices[drug.id] = calculateCityPrice(drug.basePrice, drug.volatility, currentCity.priceMultiplier);
    });
    setCityPrices(newPrices);
  }, [currentCity]);

  useEffect(() => {
    initializePrices();
  }, [currentCity.id, initializePrices]);

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
    
    dispatch({ type: "BUY_DRUG", drugId, quantity: actualQuantity, cost: totalCost });
    toast.success(`Bought ${actualQuantity} units!`);
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
    
    dispatch({ type: "SELL_DRUG", drugId, quantity: actualQuantity, profit: totalProfit });
    toast.success(`Sold ${actualQuantity} units!`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Market</h2>
      <div className="grid gap-4">
        {currentCity.availableDrugs.map((drug) => {
          const DrugIcon = drugIcons[drug.id];
          return (
            <div
              key={drug.id}
              className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <DrugIcon className="w-6 h-6 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{drug.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Price: {formatMoney(cityPrices[drug.id] || 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleBuyDrug(drug.id)}
                      className="px-3 py-1 bg-game-success text-white rounded hover:opacity-90 transition-opacity"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => handleBuyDrug(drug.id, -1)}
                      className="px-3 py-1 bg-game-success/80 text-white rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                      title="Buy Maximum Affordable Amount"
                    >
                      Max <ArrowUp className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleSellDrug(drug.id)}
                      className="px-3 py-1 bg-game-risk text-white rounded hover:opacity-90 transition-opacity"
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => handleSellDrug(drug.id, -1)}
                      className="px-3 py-1 bg-game-risk/80 text-white rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                      title="Sell All Units"
                    >
                      Max <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
