
import { ArrowUp, ArrowDown } from "lucide-react";
import { Drug } from "../../../types/game";
import { formatMoney } from "../../../utils/gameUtils";

type DrugCardProps = {
  drug: Drug;
  price: number;
  DrugIcon: any;
  hasActiveEvents: boolean;
  onBuy: (drugId: string, quantity: number) => void;
  onSell: (drugId: string, quantity: number) => void;
};

export const DrugCard = ({
  drug,
  price,
  DrugIcon,
  hasActiveEvents,
  onBuy,
  onSell,
}: DrugCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DrugIcon className="w-6 h-6 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{drug.name}</h3>
            <p className="text-sm text-muted-foreground">
              Price: {formatMoney(price)}
            </p>
            {hasActiveEvents && (
              <p className="text-sm text-warning">
                Market event affecting price!
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => onBuy(drug.id, 1)}
              className="px-3 py-1 bg-game-success text-white rounded hover:opacity-90 transition-opacity"
            >
              Buy
            </button>
            <button
              onClick={() => onBuy(drug.id, -1)}
              className="px-3 py-1 bg-game-success/80 text-white rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
              title="Buy Maximum Affordable Amount"
            >
              Max <ArrowUp className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => onSell(drug.id, 1)}
              className="px-3 py-1 bg-game-risk text-white rounded hover:opacity-90 transition-opacity"
            >
              Sell
            </button>
            <button
              onClick={() => onSell(drug.id, -1)}
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
};
