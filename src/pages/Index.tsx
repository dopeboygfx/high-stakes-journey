
import { useEffect, useState, useCallback } from "react";
import { useGame } from "../context/GameContext";
import { CITIES, DRUGS } from "../constants/gameData";
import { toast } from "sonner";
import { AlertCircle, DollarSign, MapPin, Truck, ArrowUp, ArrowDown } from "lucide-react";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const Index = () => {
  const { state, dispatch } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  const [cityPrices, setCityPrices] = useState<Record<string, number>>({});

  const calculatePrice = useCallback((basePrice: number, volatility: number) => {
    const randomFactor = 1 + (Math.random() - 0.5) * 2 * volatility;
    return Math.round(basePrice * currentCity.priceMultiplier * randomFactor);
  }, [currentCity.priceMultiplier]);

  const initializePrices = useCallback(() => {
    const newPrices: Record<string, number> = {};
    currentCity.availableDrugs.forEach((drug) => {
      newPrices[drug.id] = calculatePrice(drug.basePrice, drug.volatility);
    });
    setCityPrices(newPrices);
  }, [currentCity.availableDrugs, calculatePrice]);

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

  const handleTravel = (cityId: string) => {
    if (cityId === state.currentCity) {
      toast.error("You're already in this city!");
      return;
    }
    dispatch({ type: "TRAVEL_TO_CITY", cityId });
    
    // Make it harder to get caught by reducing the probability
    // Now the chance of getting caught is heat/200 (e.g., 50% heat = 25% chance)
    if (Math.random() < state.heat / 200) {
      dispatch({ type: "GAME_OVER" });
    }
  };

  useEffect(() => {
    if (state.gameOver) {
      toast.error("Game Over! You got caught!");
    }
  }, [state.gameOver]);

  if (state.gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-game-risk">Game Over</h1>
          <p className="text-xl">Final Score: {formatMoney(state.money)}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-game-accent text-black rounded-md hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Current Location</div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="text-xl font-semibold">{currentCity.name}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Your Money</div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-game-success" />
              <span className="text-xl font-semibold">
                {formatMoney(state.money)}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Heat Level</div>
            <div className="flex items-center space-x-2">
              <AlertCircle
                className={`w-5 h-5 ${
                  state.heat > 70 ? "text-game-risk animate-risk-pulse" : ""
                }`}
              />
              <span className="text-xl font-semibold">{state.heat}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Market</h2>
            <div className="grid gap-4">
              {currentCity.availableDrugs.map((drug) => (
                <div
                  key={drug.id}
                  className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{drug.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Price: {formatMoney(cityPrices[drug.id] || 0)}
                      </p>
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
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Travel</h2>
            <div className="grid gap-4">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleTravel(city.id)}
                  disabled={city.id === state.currentCity}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    city.id === state.currentCity
                      ? "bg-card/50 border-border/50 cursor-default"
                      : "bg-card hover:border-border/80 hover:translate-y-[-2px]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {city.description}
                      </p>
                    </div>
                    {city.id !== state.currentCity && (
                      <Truck className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>
          {state.inventory.length > 0 ? (
            <div className="grid gap-2">
              {state.inventory.map((item) => {
                const drug = DRUGS.find((d) => d.id === item.drugId)!;
                return (
                  <div
                    key={item.drugId}
                    className="flex justify-between items-center"
                  >
                    <span>{drug.name}</span>
                    <span className="text-muted-foreground">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">Your inventory is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
