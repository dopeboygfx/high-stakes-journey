
import { useGame } from "../../context/GameContext";
import { DRUGS } from "../../constants/gameData";

export const Inventory = () => {
  const { state } = useGame();

  return (
    <div className="p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-sm">
      <h2 className="text-base font-semibold mb-1.5">Inventory</h2>
      {state.inventory.length > 0 ? (
        <div className="grid gap-1">
          {state.inventory.map((item) => {
            const drug = DRUGS.find((d) => d.id === item.drugId)!;
            return (
              <div
                key={item.drugId}
                className="flex justify-between items-center"
              >
                <span className="text-xs">{drug.name}</span>
                <span className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Your inventory is empty</p>
      )}
    </div>
  );
};
