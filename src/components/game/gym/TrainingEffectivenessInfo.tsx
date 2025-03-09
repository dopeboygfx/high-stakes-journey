
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

export const TrainingEffectivenessInfo = () => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h3 className="text-sm font-medium mb-1">Training Effectiveness</h3>
          <p className="text-xs text-muted-foreground">
            Your training is most effective when you're at an optimal level based on your awake value. 
            Training at optimal levels gives +3 attribute points, while training at non-optimal levels 
            gives less. Keep an eye on your awake level!
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Optimal (+3)
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">You gain +3 attribute points per training session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Good (+2)
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">You gain +2 attribute points per training session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Poor (+1)
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">You gain only +1 attribute point per training session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
