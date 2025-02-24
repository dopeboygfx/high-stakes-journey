
import { Shield } from "lucide-react";

type MarketHeaderProps = {
  isHighRisk: boolean;
};

export const MarketHeader = ({ isHighRisk }: MarketHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Market</h2>
      {isHighRisk && (
        <div className="flex items-center gap-2 text-game-risk">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">High Police Activity</span>
        </div>
      )}
    </div>
  );
};
