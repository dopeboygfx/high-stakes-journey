
import { Truck, Pill, Cannabis, Vial, Wine, Candy } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { CITIES, VEHICLES, BASE_TRAVEL_SPEED } from "../../constants/gameData";

const drugIcons: Record<string, any> = {
  weed: Cannabis,
  cocaine: Pill,
  lsd: Vial,
  shrooms: Wine,
  ecstasy: Candy,
};

export const TravelOptions = () => {
  const { state, dispatch } = useGame();

  const calculateDistance = (fromCityId: string, toCityId: string) => {
    const fromCity = CITIES.find(c => c.id === fromCityId)!;
    const toCity = CITIES.find(c => c.id === toCityId)!;
    
    const dx = toCity.coordinates.x - fromCity.coordinates.x;
    const dy = toCity.coordinates.y - fromCity.coordinates.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateTravelTime = (distance: number) => {
    const vehicle = VEHICLES.find(v => v.id === state.currentVehicle)!;
    return Math.round(distance / (BASE_TRAVEL_SPEED * vehicle.speed) * 1000);
  };

  const handleTravel = async (cityId: string) => {
    if (state.isTraveling) {
      toast.error("You're already traveling!");
      return;
    }
    
    if (cityId === state.currentCity) {
      toast.error("You're already in this city!");
      return;
    }

    const distance = calculateDistance(state.currentCity, cityId);
    const travelTime = calculateTravelTime(distance);
    
    dispatch({ type: "SET_TRAVELING", isTraveling: true });

    const toastId = toast.loading(`Traveling... (${Math.round(travelTime / 1000)}s)`);
    
    await new Promise(resolve => setTimeout(resolve, travelTime));
    
    dispatch({ type: "TRAVEL_TO_CITY", cityId });
    dispatch({ type: "SET_TRAVELING", isTraveling: false });
    toast.dismiss(toastId);
    
    if (Math.random() < state.heat / 200) {
      dispatch({ type: "GAME_OVER" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Travel</h2>
      <div className="grid gap-4">
        {CITIES.map((city) => {
          const distance = calculateDistance(state.currentCity, city.id);
          const travelTime = calculateTravelTime(distance);
          
          return (
            <button
              key={city.id}
              onClick={() => handleTravel(city.id)}
              disabled={city.id === state.currentCity || state.isTraveling}
              className={`p-4 rounded-lg border text-left transition-all ${
                city.id === state.currentCity
                  ? "bg-card/50 border-border/50 cursor-default"
                  : state.isTraveling
                  ? "bg-card/50 border-border/50 cursor-not-allowed opacity-50"
                  : "bg-card hover:border-border/80 hover:translate-y-[-2px]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{city.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {city.description}
                  </p>
                  {city.id !== state.currentCity && (
                    <p className="text-sm text-muted-foreground">
                      Travel time: {Math.round(travelTime / 1000)}s
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {city.availableDrugs.map((drug) => {
                      const DrugIcon = drugIcons[drug.id];
                      return (
                        <DrugIcon
                          key={drug.id}
                          className="w-4 h-4 text-muted-foreground"
                          title={`${drug.name} available here`}
                        />
                      );
                    })}
                  </div>
                </div>
                {city.id !== state.currentCity && (
                  <Truck className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
