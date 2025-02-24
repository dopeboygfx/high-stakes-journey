
import { useGame } from "../../context/GameContext";
import { DRUGS } from "../../constants/gameData";

export const Inventory = () => {
  const { state } = useGame();

  return (
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Inventory</h2>
      {state.inventory.length > 0 ? (
        <div className="grid gap-2">
          {state.inventory.map((item) => {
            const drug = DRUGS.find((d) => d.id === item.drugId)!;
            return (
              <div
                key={item.drugId}
                className="flex justify-between items-center"
              >
                <span>{drug.name}</span>
                <span className="text-muted-foreground">
                  Quantity: {item.quantity}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">Your inventory is empty</p>
      )}
    </div>
  );
};
