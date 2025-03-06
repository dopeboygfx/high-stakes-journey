
import { Shield } from "lucide-react";

type MarketHeaderProps = {
  isHighRisk: boolean;
};

export const MarketHeader = ({ isHighRisk }: MarketHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-2 border-b pb-2">
      <h2 className="text-lg font-semibold">Market</h2>
      {isHighRisk && (
        <div className="flex items-center gap-1.5 text-game-risk px-2 py-1 border border-game-risk/30 rounded">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-medium">High Police Activity</span>
        </div>
      )}
    </div>
  );
};
