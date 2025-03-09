
import { AlertTriangle } from "lucide-react";
import { Badge } from "../../ui/badge";

type MarketHeaderProps = {
  isHighRisk: boolean;
  cityLevel?: number;
  playerLevel: number;
};

export const MarketHeader = ({ isHighRisk, cityLevel = 1, playerLevel }: MarketHeaderProps) => {
  return (
    <div className="p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Drug Market</h2>
        <div className="flex items-center gap-2">
          {isHighRisk && (
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-destructive mr-1" />
              <span className="text-xs text-destructive font-medium">High Risk</span>
            </div>
          )}
          
          <Badge variant={cityLevel <= playerLevel ? "default" : "destructive"}>
            Level {cityLevel} Required
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Buy low, sell high, and beware the authorities.
      </p>
    </div>
  );
};
