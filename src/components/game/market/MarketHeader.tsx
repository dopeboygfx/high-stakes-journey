
import { AlertCircle, LockIcon } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";

type MarketHeaderProps = {
  isHighRisk: boolean;
  cityLevel: number;
  playerLevel: number;
  isPricesLocked?: boolean;
};

export const MarketHeader = ({ 
  isHighRisk, 
  cityLevel, 
  playerLevel,
  isPricesLocked = false
}: MarketHeaderProps) => {
  // Check if player meets level requirement
  const canAccess = playerLevel >= cityLevel;
  
  return (
    <div className="space-y-2">
      {isHighRisk && (
        <Alert variant="destructive" className="py-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            Police activity is high in this area. Trade with caution!
          </AlertDescription>
        </Alert>
      )}
      
      {!canAccess && (
        <Alert variant="destructive" className="py-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            You need to be level {cityLevel} to trade in this city!
          </AlertDescription>
        </Alert>
      )}
      
      {isPricesLocked && (
        <Alert variant="warning" className="py-3 bg-amber-500/10 border-amber-500/50 text-amber-500">
          <LockIcon className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            Market authorities have locked prices temporarily due to suspicious activity!
          </AlertDescription>
        </Alert>
      )}
      
      <div className="text-sm">
        <h2 className="text-base font-semibold">Black Market</h2>
        <p className="text-muted-foreground text-xs">
          Buy low, sell high. Watch for market events that affect prices!
        </p>
      </div>
    </div>
  );
};
