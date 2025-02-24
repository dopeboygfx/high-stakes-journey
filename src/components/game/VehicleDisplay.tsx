
import { Car } from "lucide-react";
import { Link } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { VEHICLES } from "../../constants/gameData";

export const VehicleDisplay = () => {
  const { state } = useGame();
  const currentVehicle = VEHICLES.find(v => v.id === state.currentVehicle)!;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Vehicle</h2>
        <Link
          to="/shop"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Visit Shop
        </Link>
      </div>
      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{currentVehicle.name}</h3>
            <p className="text-sm text-muted-foreground">
              {currentVehicle.description}
            </p>
            <p className="text-sm text-muted-foreground">
              Speed: {currentVehicle.speed}x
            </p>
          </div>
          <Car className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};
