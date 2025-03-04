
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { AchievementsPanel } from '../components/game/AchievementsPanel';

const Achievements = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Achievements</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <AchievementsPanel />
      </div>
      
      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Back to Game
        </Link>
      </div>
    </div>
  );
};

export default Achievements;
