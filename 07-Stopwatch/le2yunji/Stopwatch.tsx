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

// 시간을 어떻게 증가시키지 ?
// 경과 시간 = 현재 시각 - 누른 시간 + 이전에 누적된 시간

// Date.now()는 이런 곳에서 쓰면 돼.

// 이벤트 핸들러 안
// useEffect 안
// setInterval / requestAnimationFrame 콜백 안

// 즉, 렌더 중에 직접 계산하지 말고, 현재 시간 값을 state로 저장해서 화면에 보여줘야 해.
