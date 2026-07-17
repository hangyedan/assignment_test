import { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [tick, setTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const rAfRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    let startTime = performance.now();
    const update = (now: number) => {
      const duration = now - startTime;
      startTime = now;

      setTick((prev) => prev + duration);
      rAfRef.current = requestAnimationFrame(update);
    };

    rAfRef.current = requestAnimationFrame(update);

    return () => {
      if (rAfRef.current !== null) {
        globalThis.cancelAnimationFrame(rAfRef.current);
      }
    };
  }, [isRunning]);

  const handleStartButton = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetButton = () => {
    setTick(0);
    setIsRunning(false);
  };

  return (
    <div>
      <p>{formatTick(tick)}</p>
      <div>
        <button type='button' onClick={handleStartButton}>
          {isRunning ? "stops" : "starts"}
        </button>
        <button type='button' onClick={handleResetButton}>
          reset
        </button>
      </div>
    </div>
  );
}

function formatTick(tick: number) {
  const totalMs = Math.floor(tick);
  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  return `${h > 0 ? h + "h : " : ""}${m > 0 ? m + "m : " : ""}${s}s : ${ms}ms`;
}
