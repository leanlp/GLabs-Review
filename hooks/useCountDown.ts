import { useEffect, useState, useCallback } from "react";

export const useCountDown = (date: string) => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountDown = useCallback(() => {
    const diff = +new Date(date) - +new Date();
    if (diff > 0) {
      setCountDown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
  }, [date]);

  useEffect(() => {
    calculateCountDown();
    const timer = setInterval(() => calculateCountDown(), 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return countDown;
};
