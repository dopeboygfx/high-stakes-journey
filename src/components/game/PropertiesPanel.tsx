
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Building, DollarSign, ArrowDownRight } from 'lucide-react';
import { formatMoney } from '../../utils/gameUtils';

export const PropertiesPanel = () => {
  const { state } = useGame();
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Properties" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>PROPERTIES</span>
      </div>
      
      <div className="game-content">
        <div className="flex justify-between items-center bg-black/30 px-4 py-2 rounded-md mb-3">
          <div className="font-bold text-xl text-green-500 flex items-center">
            <span>+{formatMoney(15000000)}</span>
            <span className="text-sm font-normal text-gray-400 ml-1">hr. income</span>
          </div>
          <div className="font-bold text-xl text-red-500 flex items-center">
            <span>-{formatMoney(5310000)}</span>
            <span className="text-sm font-normal text-gray-400 ml-1">mob upkeep</span>
          </div>
        </div>
        
        <button
          onClick={() => {}}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md transition-colors"
        >
          Buy Properties
        </button>
      </div>
    </div>
  );
};
