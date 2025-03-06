
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
      {/* Status Bar - Super compact */}
      <div className="py-0.5 px-1 bg-card border-b border-border text-[10px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-0.5">
            <MapPin className="w-2.5 h-2.5" />
            <span>{currentCity.name}</span>
          </div>
          
          <div className="flex items-center gap-0.5">
            <DollarSign className="w-2.5 h-2.5 text-game-success" />
            <span>{formatMoney(state.money)}</span>
          </div>
          
          <div className="flex items-center gap-0.5">
            <Gauge className="w-2.5 h-2.5" />
            <span>Lvl {state.playerStats.level}</span>
          </div>
          
          <div className="flex items-center gap-0.5 w-14">
            <span>E:</span>
            <Progress value={energyPercentage} className="h-1" />
            <span className="text-[9px]">{state.playerStats.energy}</span>
          </div>
          
          <div className="flex items-center gap-0.5">
            <AlertCircle className={`w-2.5 h-2.5 ${heatColor} ${state.heat > 70 ? "animate-pulse" : ""}`} />
            <span className={`${heatColor}`}>{state.heat}%</span>
          </div>
        </div>
      </div>
      
      {/* Navigation - Super compact */}
      <nav className="bg-background py-0.5">
        <div className="container mx-auto px-1">
          <ul className="flex justify-between items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center py-0.5 px-1.5 rounded-md transition-colors ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[8px]">{item.label}</span>
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
