
import { useGame } from "../context/GameContext";
import { CITIES } from "../constants/gameData";
import { Building2, Car, Store, Home, BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const City = () => {
  const { state } = useGame();
  const currentCity = CITIES.find((city) => city.id === state.currentCity)!;

  const locations = [
    {
      name: "Vehicle Shop",
      description: "Buy vehicles for faster travel",
      icon: Car,
      to: `/city/${currentCity.id}/vehicle-shop`,
    },
    {
      name: "Market",
      description: "Buy and sell goods",
      icon: Store,
      to: `/market`,
    },
    {
      name: "City Hall",
      description: "Coming soon...",
      icon: Building2,
      to: `/city/${currentCity.id}/city-hall`,
      disabled: true,
    },
    {
      name: "Real Estate",
      description: "Coming soon...",
      icon: Home,
      to: `/city/${currentCity.id}/real-estate`,
      disabled: true,
    },
    {
      name: "Bank",
      description: "Coming soon...",
      icon: BadgeDollarSign,
      to: `/city/${currentCity.id}/bank`,
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{currentCity.name}</h1>
          <p className="text-muted-foreground">{currentCity.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => {
            const Icon = location.icon;
            return (
              <Link
                key={location.name}
                to={location.to}
                className={`block p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors ${
                  location.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h2 className="font-semibold">{location.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {location.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to Map
        </Link>
      </div>
    </div>
  );
};

export default City;
