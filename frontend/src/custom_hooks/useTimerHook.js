import { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime = 0, interval = 1000, countDown = false) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => (countDown ? prevTime - 1 : prevTime + 1));
      }, interval);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, interval, countDown]);

  useEffect(() => {
    if (countDown && time <= 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  }, [time, countDown]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return {
    time,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
