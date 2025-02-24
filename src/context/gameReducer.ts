import { GameState, GameAction, TimeOfDay } from "../types/game";
import { CITIES, VEHICLES } from "../constants/gameData";

const TIME_SEGMENTS: TimeOfDay[] = ['dawn', 'day', 'dusk', 'night'];

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "BUY_DRUG":
      return {
        ...state,
        money: state.money - action.cost,
        inventory: [
          ...state.inventory.filter((item) => item.drugId !== action.drugId),
          {
            drugId: action.drugId,
            quantity:
              (state.inventory.find((item) => item.drugId === action.drugId)
                ?.quantity || 0) + action.quantity,
          },
        ],
      };
    case "SELL_DRUG": {
      const newInventory = state.inventory
        .map((item) =>
          item.drugId === action.drugId
            ? { ...item, quantity: item.quantity - action.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      return {
        ...state,
        money: state.money + action.profit,
        inventory: newInventory,
        heat: newInventory.length === 0 ? 0 : state.heat,
      };
    }
    case "TRAVEL_TO_CITY": {
      const hasHeatReduction = state.abilities.find(a => 
        a.id === "smooth_talk" && a.unlocked
      );
      
      const heatIncrease = hasHeatReduction 
        ? Math.round(10 * (1 - hasHeatReduction.magnitude))
        : 10;

      return {
        ...state,
        currentCity: action.cityId,
        heat: state.inventory.length > 0 
          ? Math.min(state.heat + heatIncrease, 100)
          : state.heat,
      };
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
    case "INCREASE_HEAT":
      return {
        ...state,
        heat: Math.min(state.heat + 10, 100),
        wantedLevel: state.heat >= 90 ? Math.min(state.wantedLevel + 1, 5) : state.wantedLevel,
      };
    case "REDUCE_HEAT":
      return {
        ...state,
        heat: Math.max(0, state.heat - 5),
      };
    case "ADD_MONEY":
      return {
        ...state,
        money: state.money + action.amount,
      };
    case "REMOVE_MONEY":
      return {
        ...state,
        money: Math.max(0, state.money - action.amount),
      };
    case "UNLOCK_ABILITY": {
      const ability = state.abilities.find(a => a.id === action.abilityId)!;
      if (state.money < ability.cost) return state;

      return {
        ...state,
        money: state.money - ability.cost,
        abilities: state.abilities.map(a =>
          a.id === action.abilityId ? { ...a, unlocked: true } : a
        ),
      };
    }
    case "UPDATE_REPUTATION":
      return {
        ...state,
        reputations: state.reputations.map(rep =>
          rep.cityId === action.cityId
            ? {
                ...rep,
                level: Math.max(-100, Math.min(100, rep.level + action.amount)),
              }
            : rep
        ),
      };
    case "UPDATE_POLICE_ACTIVITY":
      return {
        ...state,
        policeActivity: state.policeActivity.map(activity =>
          activity.cityId === action.cityId
            ? {
                ...activity,
                level: Math.min(activity.level + 10, 100),
                isInvestigating: activity.level >= 80,
              }
            : activity
        ),
      };
    case "ATTEMPT_BRIBE": {
      const success = Math.random() < 0.6 - (state.bribeAttempts * 0.1);
      return {
        ...state,
        money: state.money - action.amount,
        heat: success ? Math.max(0, state.heat - 30) : state.heat + 20,
        bribeAttempts: state.bribeAttempts + 1,
        wantedLevel: success ? Math.max(0, state.wantedLevel - 1) : state.wantedLevel,
      };
    }
    case "ADD_MARKET_EVENT":
      return {
        ...state,
        activeMarketEvents: [
          ...state.activeMarketEvents,
          { ...action.event, startTime: Date.now() }
        ],
      };
    case "REMOVE_MARKET_EVENT":
      return {
        ...state,
        activeMarketEvents: state.activeMarketEvents.filter(
          event => event.id !== action.eventId
        ),
      };
    case "GAME_OVER":
      return {
        ...state,
        gameOver: true,
        finalScore: state.money + (state.abilities.filter(a => a.unlocked).length * 5000),
      };
    case "ADVANCE_TIME": {
      const currentIndex = TIME_SEGMENTS.indexOf(state.timeOfDay);
      const nextTime = TIME_SEGMENTS[(currentIndex + 1) % TIME_SEGMENTS.length];
      const newDayCount = nextTime === 'dawn' ? state.dayCount + 1 : state.dayCount;

      return {
        ...state,
        timeOfDay: nextTime,
        dayCount: newDayCount,
      };
    }
    default:
      return state;
  }
};
