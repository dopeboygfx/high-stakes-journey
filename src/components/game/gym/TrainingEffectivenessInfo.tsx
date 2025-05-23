
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

export const TrainingEffectivenessInfo = () => {
  return (
    <div className="bg-muted/50 p-2 rounded-lg mb-2">
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-primary mt-0.5" />
        <div className="w-full">
          <h3 className="text-xs font-medium mb-1">Training Effectiveness</h3>
          
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-7">
              <TabsTrigger value="basics" className="text-xs py-1">Basics</TabsTrigger>
              <TabsTrigger value="optimal" className="text-xs py-1">Optimal Training</TabsTrigger>
              <TabsTrigger value="strategy" className="text-xs py-1">Strategy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="pt-1">
              <p className="text-xs text-muted-foreground">
                Your training effectiveness depends on your character's level and awake value.
                Higher effectiveness means more attribute points gained per training session.
              </p>
              <div className="mt-1 grid grid-cols-3 gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Optimal (+3)
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">You gain +3 attribute points per training session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Good (+2)
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">You gain +2 attribute points per training session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Poor (+1)
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">You gain only +1 attribute point per training session</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TabsContent>
            
            <TabsContent value="optimal" className="pt-1">
              <p className="text-xs text-muted-foreground">
                Optimal training levels are calculated based on your awake value. 
                Every time you train, your awake value decreases. You'll need to rest 
                or use consumables to restore your awake value.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-semibold">Formula:</span> The first optimal level = 
                (awake/100)/2 - 9, with additional optimal levels spaced at intervals of (awake/100)/2.
              </p>
            </TabsContent>
            
            <TabsContent value="strategy" className="pt-1">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Strategic Tips:</span>
              </p>
              <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-0.5">
                <li>Train at optimal levels to maximize attribute gains</li>
                <li>Use energy drinks to restore energy for more training sessions</li>
                <li>Balance your attributes based on your combat strategy</li>
                <li>Strength increases damage, Defense reduces damage taken, Speed improves both attack and defense chances</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
