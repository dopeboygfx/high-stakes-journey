
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { TimeOfDay } from '../types/game';
import { toast } from "sonner";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

const TIME_CYCLE = 5 * 60 * 1000; // 5 minutes per full day
const TIME_SEGMENTS = ['dawn', 'day', 'dusk', 'night'] as TimeOfDay[];

export const useGameTime = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'ADVANCE_TIME' });
      
      const currentIndex = TIME_SEGMENTS.indexOf(state.timeOfDay);
      const nextTime = TIME_SEGMENTS[(currentIndex + 1) % TIME_SEGMENTS.length];
      
      const TimeIcon = {
        dawn: Sunrise,
        day: Sun,
        dusk: Sunset,
        night: Moon
      }[nextTime];

      toast(
        <div className="flex items-center gap-2">
          <TimeIcon className="w-4 h-4" />
          <span>It is now {nextTime}</span>
        </div>
      );

    }, TIME_CYCLE / 4); // 4 time segments per day

    return () => clearInterval(interval);
  }, [dispatch, state.timeOfDay]);

  return {
    timeOfDay: state.timeOfDay,
    dayCount: state.dayCount,
    getPriceMultiplier: () => {
      switch (state.timeOfDay) {
        case 'dawn':
          return 1.1;
        case 'day':
          return 1.0;
        case 'dusk':
          return 0.9;
        case 'night':
          return 1.3;
      }
    },
    getRiskMultiplier: () => {
      switch (state.timeOfDay) {
        case 'dawn':
          return 0.8;
        case 'day':
          return 1.0;
        case 'dusk':
          return 1.2;
        case 'night':
          return 0.6;
      }
    }
  };
};
