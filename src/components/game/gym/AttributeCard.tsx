
import React from 'react';
import { Button } from '../../ui/button';
import { LucideIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface AttributeCardProps {
  icon: LucideIcon;
  name: string;
  value: number;
  description: string;
  onTrain: () => void;
  disabled: boolean;
  effectiveness?: 'optimal' | 'good' | 'poor';
  gainAmount?: number;
}

export const AttributeCard = ({
  icon: Icon,
  name,
  value,
  description,
  onTrain,
  disabled,
  effectiveness = 'good',
  gainAmount = 1
}: AttributeCardProps) => {
  // Different styling based on effectiveness
  const getEffectivenessColor = () => {
    switch(effectiveness) {
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'poor': 
      default: return 'bg-orange-100 text-orange-800';
    }
  };
  
  const getEffectivenessLabel = () => {
    switch(effectiveness) {
      case 'optimal': return 'Optimal';
      case 'good': return 'Good';
      case 'poor': 
      default: return 'Poor';
    }
  };

  return (
    <div className="p-3 bg-card rounded-lg border flex flex-col items-center justify-center h-full">
      <Icon className="h-8 w-8 mb-2 text-primary" />
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-2xl font-bold my-1">{value}</p>
      <p className="text-xs text-muted-foreground text-center mb-1">
        {description}
      </p>
      
      <div className="w-full flex justify-between items-center mb-2 text-xs px-1">
        <Badge variant="outline" className={getEffectivenessColor()}>
          {getEffectivenessLabel()}
        </Badge>
        <span className="font-semibold">+{gainAmount} per training</span>
      </div>
      
      <Button 
        onClick={onTrain}
        disabled={disabled}
        className="w-full text-xs py-1 h-auto"
        size="sm"
      >
        Train {name} (1 Energy)
      </Button>
    </div>
  );
};
