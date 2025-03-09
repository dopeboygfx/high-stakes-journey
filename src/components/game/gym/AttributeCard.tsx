
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
    <div className="p-5 bg-card rounded-lg border flex flex-col items-center justify-center h-full">
      <Icon className="h-12 w-12 mb-3 text-primary" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-3xl font-bold my-2">{value}</p>
      <p className="text-sm text-muted-foreground text-center mb-2">
        {description}
      </p>
      
      <div className="w-full flex justify-between items-center mb-4 text-xs px-2">
        <Badge variant="outline" className={getEffectivenessColor()}>
          {getEffectivenessLabel()}
        </Badge>
        <span className="font-semibold">+{gainAmount} per training</span>
      </div>
      
      <Button 
        onClick={onTrain}
        disabled={disabled}
        className="w-full"
      >
        Train {name} (1 Energy)
      </Button>
    </div>
  );
};
