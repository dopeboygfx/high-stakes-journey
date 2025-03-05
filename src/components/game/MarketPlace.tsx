
import { Pill, Cannabis, Beaker, Wine, Candy } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";
import { MarketEvents } from "./MarketEvents";
import { DrugCard } from "./market/DrugCard";
import { MarketHeader } from "./market/MarketHeader";
import { useMarket } from "../../hooks/useMarket";

const drugIcons: Record<string, any> = {
  weed: Cannabis,
  cocaine: Pill,
  lsd: Beaker,
  shrooms: Wine,
  ecstasy: Candy,
};

export const MarketPlace = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  const { prices, isHighRisk, buyDrug, sellDrug } = useMarket(currentCity.id);

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
              price={prices[drug.id] || 0}
              DrugIcon={DrugIcon}
              hasActiveEvents={affectingEvents.length > 0}
              onBuy={buyDrug}
              onSell={sellDrug}
            />
          );
        })}
      </div>
    </div>
  );
};
