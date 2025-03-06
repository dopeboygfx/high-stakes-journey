
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
    { path: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { path: "/shop", icon: <ShoppingBag className="w-6 h-6" />, label: "Shop" },
    { path: "/explore", icon: <Map className="w-6 h-6" />, label: "Explore" },
    { path: "/gym", icon: <Dumbbell className="w-6 h-6" />, label: "Gym" },
    { path: "/achievements", icon: <Trophy className="w-6 h-6" />, label: "Achievements" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      {/* Status Bar */}
      <div className="p-2 bg-card border-b border-border">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{currentCity.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-game-success" />
            <span className="text-sm font-medium">{formatMoney(state.money)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <span className="text-sm font-medium">Lvl {state.playerStats.level}</span>
          </div>
          
          <div className="flex flex-col w-20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Energy</span>
              <span className="text-xs">{state.playerStats.energy}/{state.playerStats.maxEnergy}</span>
            </div>
            <Progress value={energyPercentage} className="h-1.5" />
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertCircle className={`w-4 h-4 ${heatColor} ${state.heat > 70 ? "animate-pulse" : ""}`} />
            <span className={`text-sm font-medium ${heatColor}`}>{state.heat}%</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-background py-1">
        <div className="container mx-auto">
          <ul className="flex justify-between items-center px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
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
