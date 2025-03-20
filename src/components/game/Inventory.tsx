
import { useGame } from "../../context/GameContext";
import { DRUGS } from "../../constants/gameData";
import { Pill } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export const Inventory = () => {
  const { state } = useGame();

  return (
    <div className="p-4 rounded-lg glass-card">
      <h2 className="header-formal">Inventory</h2>
      <ScrollArea className="h-[200px] pr-2">
        {state.inventory.length > 0 ? (
          <div className="grid gap-2">
            {state.inventory.map((item) => {
              const drug = DRUGS.find((d) => d.id === item.drugId)!;
              return (
                <div
                  key={item.drugId}
                  className="flex justify-between items-center p-2 bg-background/40 rounded-md border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-1">
                      <Pill className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{drug.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-primary/5 px-2 py-0.5 rounded-full">
                    Qty: {item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-16 text-xs text-muted-foreground border border-dashed rounded-md">
            Your inventory is empty
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
