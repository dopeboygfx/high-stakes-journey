
import React from 'react';
import { Button } from '../../ui/button';
import { LucideIcon } from 'lucide-react';

interface AttributeCardProps {
  icon: LucideIcon;
  name: string;
  value: number;
  description: string;
  onTrain: () => void;
  disabled: boolean;
}

export const AttributeCard = ({
  icon: Icon,
  name,
  value,
  description,
  onTrain,
  disabled
}: AttributeCardProps) => {
  return (
    <div className="p-5 bg-card rounded-lg border flex flex-col items-center justify-center h-full">
      <Icon className="h-12 w-12 mb-3 text-primary" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-3xl font-bold my-2">{value}</p>
      <p className="text-sm text-muted-foreground text-center mb-4">
        {description}
      </p>
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
