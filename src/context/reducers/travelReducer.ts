
import { GameState, GameAction } from "../../types/game";
import { getAvailableCrimes } from "../../constants/crimeData";
import { VEHICLES } from "../../constants/gameData";
import { generatePoliceEncounter } from "../utils/policeUtils";

export const travelReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "TRAVEL_TO_CITY": {
      const hasHeatReduction = state.abilities.find(a => 
        a.id === "smooth_talk" && a.unlocked
      );
      
      const heatIncrease = hasHeatReduction 
        ? Math.round(10 * (1 - hasHeatReduction.magnitude))
        : 10;

      // Check if this is a new city visit
      const alreadyVisited = state.stats.citiesVisited.includes(action.cityId);
      const updatedVisitedCities = alreadyVisited 
        ? state.stats.citiesVisited 
        : [...state.stats.citiesVisited, action.cityId];
      
      // Force price recalculation on city change to prevent market arbitrage
      const newState = {
        ...state,
        currentCity: action.cityId,
        heat: state.inventory.length > 0 
          ? Math.min(state.heat + heatIncrease, 100)
          : state.heat,
        stats: {
          ...state.stats,
          citiesVisited: updatedVisitedCities
        },
        priceUpdateTimestamp: Date.now(), // Reset prices when traveling
        pricesLocked: false // Reset price lock when traveling
      };
      
      // Update available crimes for the new city
      newState.availableCrimes = getAvailableCrimes(
        newState.playerStats.level,
        action.cityId
      );
      
      // Check for police encounter
      const policeEncounter = generatePoliceEncounter(newState.heat, newState.wantedLevel);
      if (policeEncounter) {
        newState.activePoliceEncounter = policeEncounter;
      }
      
      return newState;
    }
      
    case "SET_TRAVELING":
      return {
        ...state,
        isTraveling: action.isTraveling,
      };
      
    case "BUY_VEHICLE": {
      const vehicle = VEHICLES.find(v => v.id === action.vehicleId)!;
      return {
        ...state,
        money: state.money - vehicle.price,
        currentVehicle: action.vehicleId,
      };
    }
      
    default:
      return state;
  }
};
