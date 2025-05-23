
import { Truck, Pill, Cannabis, Beaker, Wine, Candy, Shield, AlertTriangle, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { CITIES, VEHICLES, BASE_TRAVEL_SPEED } from "../../constants/gameData";
import { GameEvent } from "../../types/game";
import { POLICE_ENCOUNTERS } from "../../constants/policeEncounterData";

const drugIcons: Record<string, any> = {
  weed: Cannabis,
  cocaine: Pill,
  lsd: Beaker,
  shrooms: Wine,
  ecstasy: Candy,
};

const generateRandomEvent = (heat: number): GameEvent | null => {
  const random = Math.random();
  
  if (random < heat / 200) {
    return {
      type: 'police',
      description: 'Police checkpoint ahead! They seem to be searching vehicles...',
      effect: -Math.floor(Math.random() * 1000) - 500 // Fine between $500-$1500
    };
  } else if (random < 0.15) {
    return {
      type: 'dealer',
      description: 'You met a friendly dealer who shared some market insights!',
      effect: Math.floor(Math.random() * 800) + 200 // Bonus $200-$1000
    };
  } else if (random < 0.25) {
    return {
      type: 'lucky',
      description: 'You found a shortcut!',
      effect: 0 // Speed bonus handled in travel time calculation
    };
  }
  
  return null;
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

  const calculateTravelTime = (distance: number, event?: GameEvent | null) => {
    const vehicle = VEHICLES.find(v => v.id === state.currentVehicle)!;
    const speedModifier = event?.type === 'lucky' ? 1.2 : 1;
    return Math.round(distance / (BASE_TRAVEL_SPEED * vehicle.speed * speedModifier) * 1000);
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

    const city = CITIES.find(c => c.id === cityId);
    if (city?.levelRequirement && state.playerStats.level < city.levelRequirement) {
      toast.error(`You need to be level ${city.levelRequirement} to travel to ${city.name}!`);
      return;
    }

    const event = generateRandomEvent(state.heat);
    const distance = calculateDistance(state.currentCity, cityId);
    const travelTime = calculateTravelTime(distance, event);
    
    dispatch({ type: "SET_TRAVELING", isTraveling: true });

    if (event) {
      const EventIcon = event.type === 'police' ? Shield : 
                       event.type === 'dealer' ? AlertTriangle : 
                       Sparkles;
      
      toast.info(
        <div className="flex items-center gap-2">
          <EventIcon className="w-4 h-4" />
          <span>{event.description}</span>
        </div>
      );

      if (event.effect !== 0) {
        if (event.effect > 0) {
          dispatch({ type: "ADD_MONEY", amount: event.effect });
          toast.success(`You gained $${event.effect}!`);
        } else {
          dispatch({ type: "REMOVE_MONEY", amount: Math.abs(event.effect) });
          toast.error(`You lost $${Math.abs(event.effect)}!`);
        }
      }
    }

    const toastId = toast.loading(`Traveling... (${Math.round(travelTime / 1000)}s)`);
    
    await new Promise(resolve => setTimeout(resolve, travelTime));
    
    dispatch({ type: "TRAVEL_TO_CITY", cityId });
    dispatch({ type: "SET_TRAVELING", isTraveling: false });
    toast.dismiss(toastId);
    
    if (Math.random() < state.heat / 200) {
      dispatch({ type: "GAME_OVER" });
      toast.error("You got caught by the police!");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Travel</h2>
      <div className="grid gap-4">
        {CITIES.map((city) => {
          const distance = calculateDistance(state.currentCity, city.id);
          const travelTime = calculateTravelTime(distance);
          const isLevelLocked = city.levelRequirement && state.playerStats.level < city.levelRequirement;
          
          return (
            <button
              key={city.id}
              onClick={() => handleTravel(city.id)}
              disabled={city.id === state.currentCity || state.isTraveling || isLevelLocked}
              className={`p-4 rounded-lg border text-left transition-all ${
                city.id === state.currentCity
                  ? "bg-card/50 border-border/50 cursor-default"
                  : isLevelLocked
                  ? "bg-card/50 border-border/50 cursor-not-allowed opacity-70"
                  : state.isTraveling
                  ? "bg-card/50 border-border/50 cursor-not-allowed opacity-50"
                  : "bg-card hover:border-border/80 hover:translate-y-[-2px]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{city.name}</h3>
                    {isLevelLocked && (
                      <div className="flex items-center text-amber-500 text-sm gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Level {city.levelRequirement}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {city.description}
                  </p>
                  {city.id !== state.currentCity && !isLevelLocked && (
                    <p className="text-sm text-muted-foreground">
                      Travel time: {Math.round(travelTime / 1000)}s
                    </p>
                  )}
                  {isLevelLocked && (
                    <p className="text-sm text-amber-500/80">
                      Requires level {city.levelRequirement}
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
                  <div className="flex flex-col items-end">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    {city.levelRequirement && (
                      <span className={`text-xs mt-1 ${isLevelLocked ? 'text-amber-500' : 'text-green-500'}`}>
                        Lvl {city.levelRequirement}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
