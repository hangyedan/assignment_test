import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlay) return;

    const timerId = setInterval(() => {
      if (startTimeRef.current === null) return;
      setTime(performance.now() - startTimeRef.current);
    }, 10);

    return () => clearInterval(timerId);
  }, [isPlay]);

  const handleStopWatch = () => {
    if (!isPlay) {
      startTimeRef.current = performance.now() - time;

      setIsPlay(true);
      return;
    }
    setIsPlay(false);
  };

  const handleReset = () => {
    startTimeRef.current = null;
    setTime(0);
    setIsPlay(false);
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div>
      <p>
        {String(hours).padStart(2, "0")}시{String(minutes).padStart(2, "0")}분
        {String(seconds).padStart(2, "0")}초
        {String(milliseconds).padStart(3, "0")}
      </p>
      <div>
        <button onClick={handleStopWatch}>{isPlay ? "멈추기" : "시작"}</button>
        <button onClick={handleReset}>초기화</button>
      </div>
    </div>
  );
}

const formatTime = (time: number) => {
  const standard = Math.floor(time);

  const hours = standard / (1000 * 60 * 60);
  const minutes = (standard / (1000 * 60)) % 60;
  const seconds = (standard / 1000) % 60;
  const milliseconds = standard % 1000;

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
