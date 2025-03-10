
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { ConsumablesShop } from '../components/game/ConsumablesShop';
import { VehicleShop } from '../components/game/VehicleShop';
import { Button } from '../components/ui/button';
import { useGame } from '../context/GameContext';
import { getCityConsumables, getCityVehicles } from '../utils/shopUtils';
import { CITIES } from '../constants/gameData';

const Shop = () => {
  const { state } = useGame();
  const currentCity = CITIES.find(city => city.id === state.currentCity);
  
  // Get counts for various shop items
  const consumablesCount = getCityConsumables(state.currentCity).length;
  const vehiclesCount = getCityVehicles(state.currentCity).length;
  
  return (
    <div className="container mx-auto p-3 space-y-3">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-1.5 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Shop</h1>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            <span>You're shopping in {currentCity?.name}</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 rounded-lg border bg-card/50 text-sm mb-3">
        <h2 className="text-sm font-semibold mb-1">Shop Information</h2>
        <p className="text-xs text-muted-foreground">
          Each city offers different items. Travel between cities to find the best deals and exclusive merchandise.
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="px-2 py-0.5 bg-primary/10 rounded-full">
            {consumablesCount} item{consumablesCount !== 1 ? 's' : ''} available
          </span>
          <span className="px-2 py-0.5 bg-primary/10 rounded-full">
            {vehiclesCount} vehicle{vehiclesCount !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ConsumablesShop />
        <VehicleShop />
      </div>
      
      <div className="flex justify-center mt-3">
        <Button asChild size="sm" className="h-8">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            Back to Game
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Shop;
