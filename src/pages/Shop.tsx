
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { ConsumablesShop } from '../components/game/ConsumablesShop';
import { VehicleShop } from '../components/game/VehicleShop';
import { Button } from '../components/ui/button';

const Shop = () => {
  return (
    <div className="container mx-auto p-3 space-y-3">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-1.5 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Shop</h1>
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
