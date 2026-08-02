import { useEffect, useState } from 'react';

// Default time (30 minutes)
const INITIAL_TIME = 30 * 60;
const MAX_TIME = 60 * 60;

const formatTime = (seconds: number) => {
  const safeSeconds = Math.min(Math.max(seconds, 0), MAX_TIME);
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [displayValue, setDisplayValue] = useState(formatTime(INITIAL_TIME));
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
            // Countdown has reached zero
          console.log('Countdown reached zero');
          setIsRunning(false);
          setDisplayValue(formatTime(0));
          return 0;
        }

        const next = prev - 1;
        setDisplayValue(formatTime(next));
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const reset = () => {
    setTimeLeft(INITIAL_TIME);
    setDisplayValue(formatTime(INITIAL_TIME));
    setIsRunning(false);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const play = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const setTime = (minutes: number, seconds: number) => {
    const totalSeconds = Math.max(0, Math.min(minutes * 60 + seconds, MAX_TIME));
    setTimeLeft(totalSeconds);
    setDisplayValue(formatTime(totalSeconds));
    setIsRunning(false);
  };

  return { timeLeft, displayValue, reset, stop, play, setTime };
};
