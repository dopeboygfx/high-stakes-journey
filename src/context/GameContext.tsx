import React, { createContext, useContext, useReducer } from "react";
import { GameState, Ability } from "../types/game";
import { INITIAL_MONEY, CITIES, VEHICLES } from "../constants/gameData";

const INITIAL_ABILITIES: Ability[] = [
  {
    id: "local_connect",
    name: "Local Connections",
    description: "Get better prices in cities where you have high reputation",
    cost: 5000,
    effect: "PRICE_DISCOUNT",
    magnitude: 0.1,
    unlocked: false,
  },
  {
    id: "smooth_talk",
    name: "Smooth Talker",
    description: "Reduce heat gain from traveling",
    cost: 8000,
    effect: "HEAT_REDUCTION",
    magnitude: 0.2,
    unlocked: false,
  },
  {
    id: "fast_travel",
    name: "Expert Navigator",
    description: "Increase travel speed by 20%",
    cost: 12000,
    effect: "TRAVEL_SPEED",
    magnitude: 0.2,
    unlocked: false,
  },
  {
    id: "extra_space",
    name: "Hidden Compartments",
    description: "Carry more inventory without increasing heat",
    cost: 15000,
    effect: "INVENTORY_SIZE",
    magnitude: 0.3,
    unlocked: false,
  },
];

type GameAction =
  | { type: "BUY_DRUG"; drugId: string; quantity: number; cost: number }
  | { type: "SELL_DRUG"; drugId: string; quantity: number; profit: number }
  | { type: "TRAVEL_TO_CITY"; cityId: string }
  | { type: "SET_TRAVELING"; isTraveling: boolean }
  | { type: "BUY_VEHICLE"; vehicleId: string }
  | { type: "INCREASE_HEAT" }
  | { type: "REDUCE_HEAT" }
  | { type: "ADD_MONEY"; amount: number }
  | { type: "REMOVE_MONEY"; amount: number }
  | { type: "UNLOCK_ABILITY"; abilityId: string }
  | { type: "UPDATE_REPUTATION"; cityId: string; amount: number }
  | { type: "UPDATE_POLICE_ACTIVITY"; cityId: string }
  | { type: "ATTEMPT_BRIBE"; amount: number }
  | { type: "GAME_OVER" };

const initialState: GameState = {
  money: INITIAL_MONEY,
  currentCity: CITIES[0].id,
  inventory: [],
  heat: 0,
  gameOver: false,
  currentVehicle: "feet",
  isTraveling: false,
  reputations: CITIES.map(city => ({ cityId: city.id, level: 0 })),
  abilities: INITIAL_ABILITIES,
  policeActivity: CITIES.map(city => ({
    cityId: city.id,
    level: 0,
    isInvestigating: false
  })),
  wantedLevel: 0,
  bribeAttempts: 0,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
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
    case "GAME_OVER":
      return {
        ...state,
        gameOver: true,
      };
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
