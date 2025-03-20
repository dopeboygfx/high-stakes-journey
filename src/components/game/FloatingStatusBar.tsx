
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { formatMoney } from "../../utils/gameUtils";
import { CITIES } from "../../constants/gameData";
import { 
  Home, 
  ShoppingBag, 
  Map, 
  Dumbbell, 
  Trophy,
  Gauge,
  MapPin,
  DollarSign,
  AlertCircle
} from "lucide-react";
import { Progress } from "../ui/progress";

export const FloatingStatusBar = () => {
  const { state } = useGame();
  const location = useLocation();
  
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;
  const energyPercentage = (state.playerStats.energy / state.playerStats.maxEnergy) * 100;
  const heatColor = state.heat > 70 ? "text-red-500" : "text-white";
  
  const navItems = [
    { path: "/", icon: <Home className="w-4 h-4" />, label: "Home" },
    { path: "/shop", icon: <ShoppingBag className="w-4 h-4" />, label: "Shop" },
    { path: "/explore", icon: <Map className="w-4 h-4" />, label: "Explore" },
    { path: "/gym", icon: <Dumbbell className="w-4 h-4" />, label: "Gym" },
    { path: "/achievements", icon: <Trophy className="w-4 h-4" />, label: "Achievements" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      {/* Status Bar */}
      <div className="py-1 px-2 bg-card border-b border-border text-[10px]">
        <div className="grid grid-cols-5 gap-1">
          <div className="flex items-center justify-center gap-1 border-r pr-1">
            <MapPin className="w-2.5 h-2.5" />
            <span>{currentCity.name}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 border-r pr-1">
            <DollarSign className="w-2.5 h-2.5 text-game-success" />
            <span>{formatMoney(state.money)}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1 border-r pr-1">
            <Gauge className="w-2.5 h-2.5" />
            <span>Lvl {state.playerStats.level}</span>
          </div>
          
          <div className="flex items-center justify-center w-full border-r pr-1">
            <span className="mr-0.5">E:</span>
            <Progress value={energyPercentage} className="h-1 w-8" />
            <span className="text-[9px] ml-0.5">{state.playerStats.energy}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <AlertCircle className={`w-2.5 h-2.5 ${heatColor} ${state.heat > 70 ? "animate-pulse" : ""}`} />
            <span className={`${heatColor}`}>{state.heat}%</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-background py-1">
        <div className="container mx-auto px-2">
          <ul className="grid grid-cols-5 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="flex justify-center">
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center py-0.5 px-1 rounded-md transition-colors ${
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[8px] mt-0.5">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
