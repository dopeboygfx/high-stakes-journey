
import { Car } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { VEHICLES } from "../../constants/gameData";
import { formatMoney } from "../../utils/gameUtils";
import { Button } from "../ui/button";
import { getCityVehicles } from "../../utils/shopUtils";

export const VehicleShop = () => {
  const { state, dispatch } = useGame();
  
  // Get vehicles available in this city
  const availableVehicles = getCityVehicles(state.currentCity);

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
    <div className="p-4 rounded-lg border bg-card text-sm h-full">
      <h2 className="text-base font-bold mb-4 text-center border-b pb-2">Vehicle Shop</h2>
      <div className="grid gap-3">
        {availableVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`p-4 rounded-lg border flex justify-between items-center ${
              vehicle.id === state.currentVehicle
                ? "bg-card/50 border-primary/30"
                : "bg-card"
            }`}
          >
            <div>
              <h3 className="font-medium text-xs">{vehicle.name}</h3>
              <p className="text-xs text-muted-foreground">
                {vehicle.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Speed: {vehicle.speed}x • Price: {formatMoney(vehicle.price)}
              </p>
            </div>
            {vehicle.id === state.currentVehicle ? (
              <span className="text-xs text-game-success px-3 py-1.5 border border-game-success/30 rounded-md">Current Vehicle</span>
            ) : (
              <Button
                onClick={() => handleBuyVehicle(vehicle.id)}
                className="h-9 text-xs px-4"
                variant="default"
                size="sm"
              >
                <Car className="mr-1.5 w-3 h-3" />
                Purchase
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {availableVehicles.length === 0 && (
        <div className="p-4 text-center text-muted-foreground text-sm border rounded-lg mt-4">
          No vehicles available in this city.
          <p className="text-xs mt-1">Travel to other cities to find different vehicles.</p>
        </div>
      )}
    </div>
  );
};
