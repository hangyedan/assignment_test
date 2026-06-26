import { useEffect, useState } from "react";
import formatTime from "./utils/formatTime";
import "./style/stopwatch.css";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    let animationFrameId: number;

    const update = () => {
      setNow(performance.now());
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  const displayTime =
    isRunning && startTime !== null && now !== null
      ? elapsedTime + (now - startTime)
      : elapsedTime;

  const handleStopwatch = () => {
    if (!isRunning) {
      const currentTime = performance.now();

      setStartTime(currentTime);
      setNow(currentTime);
      setIsRunning(true);
      return;
    }

    if (startTime === null || now === null) return;

    const currentTime = performance.now();

    setElapsedTime((prev) => prev + currentTime - startTime);
    setStartTime(null);
    setNow(null);
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setNow(null);
    setStartTime(null);
    setIsRunning(false);
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime(displayTime)}</div>
      <div className="button-set">
        <button
          type="button"
          onClick={handleStopwatch}
          className={isRunning ? "button-stop" : "button-start"}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button type="button" onClick={handleReset} className="button-reset">
          Reset
        </button>
      </div>
    </div>
  );
}
