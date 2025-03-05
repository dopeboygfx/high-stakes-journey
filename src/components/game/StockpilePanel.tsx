
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Car, Shield, Briefcase } from 'lucide-react';

export const StockpilePanel = () => {
  const { state } = useGame();
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Stockpile" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>STOCKPILE</span>
      </div>
      
      <div className="game-content">
        <div className="mb-3">
          <p className="flex items-center gap-2 text-gray-400">
            Total fight strength: 
            <span className="flex items-center text-white">
              🔫 3095
            </span>
            <span className="flex items-center text-white">
              <Shield className="w-4 h-4 mr-1" /> 2188
            </span>
          </p>
        </div>
        
        <div className="flex justify-between items-center bg-black/30 px-4 py-2 rounded-md">
          <div className="font-bold text-lg text-white">5555 <span className="text-sm font-normal text-gray-400">weapons</span></div>
          <div className="font-bold text-lg text-white">2728 <span className="text-sm font-normal text-gray-400">vehicles</span></div>
          <div className="font-bold text-lg text-white">1878 <span className="text-sm font-normal text-gray-400">armour</span></div>
        </div>
      </div>
    </div>
  );
};
