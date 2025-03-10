
import React from "react";
import { Clock, DollarSign, Award, MapPin, AlertTriangle } from "lucide-react";
import { Crime } from "../../../types/game";
import { formatMoney } from "../../../utils/gameUtils";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";

type CrimeCardProps = {
  crime: Crime;
  playerNerve: number;
  playerLevel: number;
  onCommit: (crimeId: string) => void;
  isCityRestricted: boolean;
};

export const CrimeCard = ({
  crime,
  playerNerve,
  playerLevel,
  onCommit,
  isCityRestricted
}: CrimeCardProps) => {
  // Calculate cooldown status
  const now = Date.now();
  const isOnCooldown = crime.lastAttempted && now - crime.lastAttempted < crime.cooldown;
  
  // Calculate cooldown progress as percentage
  let cooldownProgress = 0;
  if (isOnCooldown && crime.lastAttempted) {
    const elapsed = now - crime.lastAttempted;
    cooldownProgress = Math.min(100, (elapsed / crime.cooldown) * 100);
  }
  
  // Format cooldown time remaining
  const getCooldownText = () => {
    if (!crime.lastAttempted || !isOnCooldown) return "Ready";
    
    const remaining = crime.lastAttempted + crime.cooldown - now;
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };
  
  // Check if player meets the requirements
  const hasEnoughNerve = playerNerve >= crime.nerveRequired;
  const meetsLevelReq = !crime.requiredLevel || playerLevel >= crime.requiredLevel;
  const canCommit = hasEnoughNerve && meetsLevelReq && !isOnCooldown && !isCityRestricted;
  
  // Success estimate based on crime success rate and player level
  const getSuccessEstimate = () => {
    const baseSuccess = crime.successRate;
    const levelBonus = Math.min(0.25, (playerLevel - crime.nerveRequired) * 0.01);
    const totalChance = (baseSuccess + levelBonus) * 100;
    
    if (totalChance >= 80) return "Very High";
    if (totalChance >= 60) return "High";
    if (totalChance >= 40) return "Medium";
    if (totalChance >= 20) return "Low";
    return "Very Low";
  };
  
  // Get success chance color
  const getSuccessColor = () => {
    const chance = getSuccessEstimate();
    switch(chance) {
      case "Very High": return "text-green-500";
      case "High": return "text-green-400";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-orange-500";
      case "Very Low": return "text-red-500";
      default: return "text-yellow-500";
    }
  };
  
  return (
    <div className={`p-3 rounded-lg border ${canCommit ? "border-border" : "border-destructive/30"} bg-card/60 backdrop-blur-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{crime.name}</h3>
          <p className="text-xs text-muted-foreground">{crime.description}</p>
        </div>
        
        {crime.requiresMastery && (
          <Badge variant="success" className="ml-2">Mastery</Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          <span>Nerve: {crime.nerveRequired}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5 text-green-500" />
          <span>{formatMoney(crime.moneyGain)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-blue-500" />
          <span>{crime.expGain} XP</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className={getSuccessColor()}>Success: {getSuccessEstimate()}</span>
        </div>
        
        {crime.cityRestriction && (
          <div className="flex items-center gap-1 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-purple-500" />
            <span className="capitalize">{crime.cityRestriction.replace('_', ' ')} only</span>
          </div>
        )}
      </div>
      
      {isOnCooldown && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Cooldown:</span>
            <span>{getCooldownText()}</span>
          </div>
          <Progress value={cooldownProgress} className="h-1.5" />
        </div>
      )}
      
      <div className="mt-3">
        <Button 
          onClick={() => onCommit(crime.id)} 
          className="w-full" 
          size="sm"
          variant={canCommit ? "default" : "outline"}
          disabled={!canCommit}
        >
          {isOnCooldown ? (
            <><Clock className="w-3.5 h-3.5 mr-1" /> Cooldown</>
          ) : isCityRestricted ? (
            "Wrong City"
          ) : !hasEnoughNerve ? (
            "Not Enough Nerve"
          ) : !meetsLevelReq ? (
            `Level ${crime.requiredLevel} Required`
          ) : (
            "Commit Crime"
          )}
        </Button>
      </div>
    </div>
  );
};
