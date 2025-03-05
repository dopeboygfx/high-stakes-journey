
import React from 'react';
import { useGame } from '../../context/GameContext';

export const ChallengesPanel = () => {
  const { state } = useGame();
  
  return (
    <div className="game-card">
      <div className="game-header flex items-center gap-2">
        <img 
          src="https://placehold.co/40x40/yellow/333" 
          alt="Challenges" 
          className="w-10 h-10 rounded-md object-cover"
        />
        <span>CHALLENGES</span>
      </div>
      
      <div className="game-content">
        <div className="flex justify-center items-center bg-black/30 h-10 rounded-md">
          <p className="text-gray-400">No active challenges</p>
        </div>
      </div>
    </div>
  );
};
