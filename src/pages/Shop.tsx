
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { ConsumablesShop } from '../components/game/ConsumablesShop';
import { VehicleShop } from '../components/game/VehicleShop';

const Shop = () => {
  return (
    <div className="container mx-auto p-2 space-y-3">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="p-1 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold">Shop</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ConsumablesShop />
        <VehicleShop />
      </div>
      
      <div className="flex justify-center mt-4">
        <Link
          to="/"
          className="flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm"
        >
          <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
          Back to Game
        </Link>
      </div>
    </div>
  );
};

export default Shop;
