import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const TIMER_DURATION = 5;
  const timerIntervalRef = useRef(null);
  const [currentTimer, setCurrentTimer] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const startedTimeRef = useRef(null);

  useEffect(() => {
    startedTimeRef.current = Date.now();
    const updateTimer = () => {
      const now = Date.now();
      const timeRem = TIMER_DURATION * 60 * 1000 - (now - startedTimeRef.current);

      if (timeRem <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setCurrentTimer({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const hrs = String(Math.floor(timeRem / (1000 * 60 * 60))).padStart(
        2,
        "0",
      );
      const mins = String(
        Math.floor((timeRem % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, "0");
      const secs = String(Math.floor((timeRem % (1000 * 60)) / 1000)).padStart(
        2,
        "0",
      );

      setCurrentTimer({
        hours: hrs,
        minutes: mins,
        seconds: secs,
      });
    };

    updateTimer();
    timerIntervalRef.current = setInterval(updateTimer, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, []);

  return (
    <div className="timer">
      <h1>
        Deal ends in: {currentTimer.hours}:{currentTimer.minutes}:{" "}
        {currentTimer.seconds}
      </h1>
      <p></p>
    </div>
  );
};

export default Timer;
