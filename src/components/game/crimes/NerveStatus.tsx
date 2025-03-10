
import React, { useEffect, useState } from "react";
import { Clock, Activity } from "lucide-react";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";

type NerveStatusProps = {
  nerve: number;
  maxNerve: number;
  lastRegen: number;
  onRegenerate: () => void;
};

export const NerveStatus = ({ nerve, maxNerve, lastRegen, onRegenerate }: NerveStatusProps) => {
  const [timeUntilRegen, setTimeUntilRegen] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const nervePercentage = (nerve / maxNerve) * 100;
  
  useEffect(() => {
    // Regenerate nerve every 5 minutes (300000ms)
    const regenRate = 300000;
    
    const updateNerveTimer = () => {
      const now = Date.now();
      const nextRegenTime = lastRegen + regenRate;
      
      if (now >= nextRegenTime) {
        onRegenerate();
        return;
      }
      
      const timeLeft = nextRegenTime - now;
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      
      setTimeUntilRegen(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      setProgress((regenRate - timeLeft) / regenRate * 100);
    };
    
    updateNerveTimer();
    const timer = setInterval(updateNerveTimer, 1000);
    
    return () => clearInterval(timer);
  }, [lastRegen, nerve, maxNerve, onRegenerate]);
  
  return (
    <div className="p-3 bg-card rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Nerve</h3>
        </div>
        <Badge variant="outline">
          {nerve}/{maxNerve}
        </Badge>
      </div>
      
      <Progress value={nervePercentage} className="h-2 mt-2" />
      
      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        {nerve < maxNerve ? (
          <>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>Next in {timeUntilRegen}</span>
            </div>
            <Progress value={progress} className="w-16 h-1" />
          </>
        ) : (
          <span>Fully regenerated</span>
        )}
      </div>
    </div>
  );
};
