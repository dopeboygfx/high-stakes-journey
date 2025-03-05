
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Users, UserPlus } from 'lucide-react';

export const MobPanel = () => {
  const { state } = useGame();
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Grow Mob" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>GROW MOB</span>
      </div>
      
      <div className="game-content">
        <p className="text-gray-400 mb-3">
          Invite players to your mob and hire mobsters
        </p>
        
        <div className="flex justify-between items-center bg-black/30 px-4 py-2 rounded-md">
          <div className="font-bold text-lg text-amber-500">1000 / 1000 <span className="text-sm font-normal text-gray-400">recruited</span></div>
          <div className="font-bold text-lg text-amber-500">3 / 1000 <span className="text-sm font-normal text-gray-400">hired</span></div>
        </div>
      </div>
    </div>
  );
};
