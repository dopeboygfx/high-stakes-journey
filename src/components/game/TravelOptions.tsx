
import { Truck } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { CITIES } from "../../constants/gameData";

export const TravelOptions = () => {
  const { state, dispatch } = useGame();

  const handleTravel = (cityId: string) => {
    if (cityId === state.currentCity) {
      toast.error("You're already in this city!");
      return;
    }
    dispatch({ type: "TRAVEL_TO_CITY", cityId });
    
    if (Math.random() < state.heat / 200) {
      dispatch({ type: "GAME_OVER" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Travel</h2>
      <div className="grid gap-4">
        {CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => handleTravel(city.id)}
            disabled={city.id === state.currentCity}
            className={`p-4 rounded-lg border text-left transition-all ${
              city.id === state.currentCity
                ? "bg-card/50 border-border/50 cursor-default"
                : "bg-card hover:border-border/80 hover:translate-y-[-2px]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{city.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {city.description}
                </p>
              </div>
              {city.id !== state.currentCity && (
                <Truck className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
