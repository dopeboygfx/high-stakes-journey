
import { ArrowUp, ArrowDown } from "lucide-react";
import { Drug } from "../../../types/game";
import { formatMoney } from "../../../utils/gameUtils";
import { Button } from "../../ui/button";

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
          <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
            <DrugIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{drug.name}</h3>
            <p className="text-xs text-muted-foreground">
              Price: {formatMoney(price)}
            </p>
            {hasActiveEvents && (
              <p className="text-xs text-warning">
                Market event affecting price!
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <Button
              onClick={() => onBuy(drug.id, 1)}
              className="h-7 px-3 py-0 text-xs"
              variant="default"
              size="sm"
            >
              Buy
            </Button>
            <Button
              onClick={() => onBuy(drug.id, -1)}
              className="h-7 px-3 py-0 text-xs"
              variant="outline"
              size="sm"
              title="Buy Maximum Affordable Amount"
            >
              Max <ArrowUp className="ml-1 w-3 h-3" />
            </Button>
          </div>
          <div className="flex flex-col space-y-1">
            <Button
              onClick={() => onSell(drug.id, 1)}
              className="h-7 px-3 py-0 text-xs"
              variant="destructive"
              size="sm"
            >
              Sell
            </Button>
            <Button
              onClick={() => onSell(drug.id, -1)}
              className="h-7 px-3 py-0 text-xs"
              variant="outline"
              size="sm"
              title="Sell All Units"
            >
              Max <ArrowDown className="ml-1 w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
