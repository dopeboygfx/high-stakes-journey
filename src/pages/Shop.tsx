
import { useNavigate } from "react-router-dom";
import { Car, ArrowLeft } from "lucide-react";
import { useGame } from "../context/GameContext";
import { VEHICLES } from "../constants/gameData";
import { formatMoney } from "../utils/gameUtils";
import { toast } from "sonner";

const Shop = () => {
  const navigate = useNavigate();
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Vehicle Shop</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VEHICLES.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`p-6 rounded-lg border ${
              state.currentVehicle === vehicle.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-border/80"
            } transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                <p className="text-muted-foreground">{vehicle.description}</p>
              </div>
              <Car className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">Speed:</span>{" "}
                <span className="font-medium">{vehicle.speed}x</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Price:</span>{" "}
                <span className="font-medium">{formatMoney(vehicle.price)}</span>
              </p>
            </div>

            <button
              onClick={() => handleBuyVehicle(vehicle.id)}
              disabled={state.currentVehicle === vehicle.id}
              className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
                state.currentVehicle === vehicle.id
                  ? "bg-accent text-accent-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {state.currentVehicle === vehicle.id ? "Owned" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
