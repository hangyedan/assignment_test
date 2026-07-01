import { useEffect, useRef, useState } from "react";
import { formatTime } from "./formatTime";

export default function Stopwatch() {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);
  const startedTimeRef = useRef(0);

  const handleStart = () => {
    startedTimeRef.current = Date.now() - time;
    setIsStarted(true);
  };

  const handleStop = () => {
    setIsStarted(false);
  };

  const handleReset = () => {
    setIsStarted(false);
    setTime(0);
    startedTimeRef.current = 0;
  };

  useEffect(() => {
    if (!isStarted) {
      return;
    }

    const interval = setInterval(() => {
      setTime(Date.now() - startedTimeRef.current);
    }, 10);

    return () => clearInterval(interval);
  }, [isStarted]);

  return (
    <div>
      <p>{formatTime(time)}</p>
      <div>
        {isStarted ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
