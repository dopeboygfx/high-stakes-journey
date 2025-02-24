
import React, { createContext, useContext, useReducer } from "react";
import { GameState } from "../types/game";
import { INITIAL_MONEY, CITIES, VEHICLES } from "../constants/gameData";

type GameAction =
  | { type: "BUY_DRUG"; drugId: string; quantity: number; cost: number }
  | { type: "SELL_DRUG"; drugId: string; quantity: number; profit: number }
  | { type: "TRAVEL_TO_CITY"; cityId: string }
  | { type: "SET_TRAVELING"; isTraveling: boolean }
  | { type: "BUY_VEHICLE"; vehicleId: string }
  | { type: "INCREASE_HEAT" }
  | { type: "ADD_MONEY"; amount: number }
  | { type: "REMOVE_MONEY"; amount: number }
  | { type: "GAME_OVER" };

const initialState: GameState = {
  money: INITIAL_MONEY,
  currentCity: CITIES[0].id,
  inventory: [],
  heat: 0,
  gameOver: false,
  currentVehicle: "feet",
  isTraveling: false,
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
    case "TRAVEL_TO_CITY":
      return {
        ...state,
        currentCity: action.cityId,
        heat: state.inventory.length > 0 
          ? Math.min(state.heat + 10, 100)
          : state.heat,
      };
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
