
import { Car } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { VEHICLES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";

export const VehicleShop = () => {
  const { state, dispatch } = useGame();

  const handleBuyVehicle = (vehicleId: string) => {
    const vehicle = VEHICLES.find(v => v.id === vehicleId)!;
    
    if (state.currentVehicle === vehicleId) {
      toast.error("You already own this vehicle!");
      return;
    }
    
    if (state.money < vehicle.price) {
      toast.error("Not enough money!");
      return;
    }

    dispatch({ type: "BUY_VEHICLE", vehicleId });
    toast.success(`Purchased ${vehicle.name}!`);
  };

  const currentVehicle = VEHICLES.find(v => v.id === state.currentVehicle)!;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Vehicle Shop</h2>
      <div className="grid gap-4">
        {VEHICLES.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => handleBuyVehicle(vehicle.id)}
            disabled={vehicle.id === state.currentVehicle}
            className={`p-4 rounded-lg border text-left transition-all ${
              vehicle.id === state.currentVehicle
                ? "bg-card/50 border-border/50 cursor-default"
                : "bg-card hover:border-border/80 hover:translate-y-[-2px]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vehicle.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Speed: {vehicle.speed}x • Price: {formatMoney(vehicle.price)}
                </p>
              </div>
              {vehicle.id === state.currentVehicle ? (
                <span className="text-sm text-game-success">Current Vehicle</span>
              ) : (
                <Car className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
