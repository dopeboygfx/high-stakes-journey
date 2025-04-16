
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";

type CrimesMarketHeaderProps = {
  isHighRisk: boolean;
  cityLevel: number;
  playerLevel: number;
  isHighNerve?: boolean;
  nerveRequired?: number;
};

export const CrimesMarketHeader = ({ 
  isHighRisk, 
  cityLevel, 
  playerLevel,
  isHighNerve = false,
  nerveRequired = 0
}: CrimesMarketHeaderProps) => {
  // Check if player meets level requirement
  const canAccess = playerLevel >= cityLevel;
  
  return (
    <div className="space-y-2">
      {isHighRisk && (
        <Alert variant="destructive" className="py-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            Police activity is high in this area. Be careful!
          </AlertDescription>
        </Alert>
      )}
      
      {!canAccess && (
        <Alert variant="destructive" className="py-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            You need to be level {cityLevel} to operate in this city!
          </AlertDescription>
        </Alert>
      )}
      
      {isHighNerve && (
        <Alert variant="destructive" className="py-3 bg-amber-500/10 border-amber-500/50 text-amber-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            Some crimes require up to {nerveRequired} nerve points!
          </AlertDescription>
        </Alert>
      )}
      
      <div className="text-sm">
        <h2 className="text-base font-semibold">Criminal Activities</h2>
        <p className="text-muted-foreground text-xs">
          Commit crimes to earn money and experience, but be careful of the police!
        </p>
      </div>
    </div>
  );
};
