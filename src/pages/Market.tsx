
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { CITIES } from "../constants/gameData";
import { Package, Sword, Shield, Flask } from "lucide-react";

const Market = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  const futureItems = [
    {
      name: "Weapons",
      description: "Coming soon - Protect yourself from rivals",
      icon: Sword,
    },
    {
      name: "Armor",
      description: "Coming soon - Reduce damage from attacks",
      icon: Shield,
    },
    {
      name: "Special Items",
      description: "Coming soon - Unique items with special effects",
      icon: Package,
    },
    {
      name: "Consumables",
      description: "Coming soon - One-time use items",
      icon: Flask,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Item Market</h1>
          <Link
            to={`/city/${currentCity.id}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to City
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Market;
