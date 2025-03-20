
import { useGame } from "../../context/GameContext";
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { MarketEvent } from "../../types/game";
import { useEffect } from "react";

export const MarketEvents = () => {
  const { state, dispatch } = useGame();

  // Clean up expired events
  useEffect(() => {
    state.activeMarketEvents.forEach(event => {
      if (event.startTime && Date.now() - event.startTime > event.duration) {
        dispatch({ type: "REMOVE_MARKET_EVENT", eventId: event.id });
      }
    });
  }, [state.activeMarketEvents, dispatch]);

  if (state.activeMarketEvents.length === 0) return null;

  const getEventIcon = (type: MarketEvent["type"]) => {
    switch (type) {
      case "crash":
        return <TrendingDown className="w-4 h-4 text-game-risk" />;
      case "boom":
      case "shortage":
        return <TrendingUp className="w-4 h-4 text-game-success" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-game-accent" />;
    }
  };

  return (
    <div className="mb-4 space-y-3">
      <h3 className="text-lg font-medium text-center border-b pb-2">Active Market Events</h3>
      <div className="grid gap-2">
        {state.activeMarketEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 p-3 rounded-md bg-background/50 border border-border/50"
          >
            <div className="p-2 rounded-full bg-card">
              {getEventIcon(event.type)}
            </div>
            <span className="text-sm">{event.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
