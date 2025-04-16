
import React from 'react';
import { Card } from '../../ui/card';
import { Zap } from 'lucide-react';

interface AwakeLevelCardProps {
  awake: number;
}

export const AwakeLevelCard = ({ awake }: AwakeLevelCardProps) => {
  return (
    <Card className="p-3 mt-2">
      <div className="flex items-center gap-1 mb-1">
        <Zap className="h-4 w-4 text-yellow-500" />
        <h3 className="font-semibold text-sm">Your Awake Level</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-1">
        Your current awake level: <span className="font-medium">{awake}/10000</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Training sessions decrease your awake level. When your awake level is low, your training effectiveness
        will decrease. Use consumables from the shop to restore your awake level.
      </p>
    </Card>
  );
};
