import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleResetButtonClick = () => {
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <div>
      <p>{formatTime(timer)}</p>
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>Start/Stop</button>
        <button onClick={handleResetButtonClick}>Reset</button>
      </div>
    </div>
  );
}

function formatTime(time: number) {
  const hours = Math.floor(time / 3_600_000);
  const minutes = Math.floor((time % 3_600_000) / 60_000);
  const seconds = Math.floor((time % 60_000) / 1_000);
  const milliseconds = Math.floor((time % 1_000) / 10);

  const formattedHours = hours.toString().padStart(2) + "h";
  const formattedMinutes = minutes.toString().padStart(2) + "m";
  const formattedSeconds = seconds.toString().padStart(2) + "s";
  const formattedMilliseconds = milliseconds.toString().padStart(2) + "ms";

  return [
    hours !== 0 ? formattedHours : null,
    minutes !== 0 ? formattedMinutes : null,
    formattedSeconds,
    formattedMilliseconds,
  ]
    .filter(Boolean)
    .join(" ");
}
