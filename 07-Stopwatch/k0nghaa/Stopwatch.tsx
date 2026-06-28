// TODO: 포맷팅

import { useState } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stopwatch = () => {
    setIsRunning((prev) => !prev);

    if (isRunning) {
      setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1);
    }
  };

  const handleStartBtn = () => {
    stopwatch();
  };

  const handleResetBtn = () => {
    setTime(0);
  };

  return (
    <div>
      <p>{time}</p>
      <div>
        <button onClick={handleStartBtn}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleResetBtn}>Reset</button>
      </div>
    </div>
  );
}
