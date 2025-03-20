
import { useGame } from "../../context/GameContext";
import { DRUGS } from "../../constants/gameData";

export const Inventory = () => {
  const { state } = useGame();

  return (
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-sm">
      <h2 className="text-base font-semibold mb-3 text-center border-b pb-2">Inventory</h2>
      {state.inventory.length > 0 ? (
        <div className="grid gap-2">
          {state.inventory.map((item) => {
            const drug = DRUGS.find((d) => d.id === item.drugId)!;
            return (
              <div
                key={item.drugId}
                className="flex justify-between items-center p-2 bg-background/40 rounded-md border border-border/30"
              >
                <span className="text-xs font-medium">{drug.name}</span>
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
    </div>
  );
};
