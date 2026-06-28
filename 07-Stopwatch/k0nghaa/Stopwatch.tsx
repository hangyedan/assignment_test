import { useEffect, useState } from 'react';
import { formatTime } from './formatTime';

export default function Stopwatch() {
  const INTERVAL = 30;

  const [time, setTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showFullFormat, setShowFullFormat] = useState(false);

  useEffect(() => {
    // 1. 타이머를 생성한다
    let timer: ReturnType<typeof setTimeout>;

    // 3. 업데이트 함수 실행
    const updateTime = () => {
      if (isRunning) {
        const now = Date.now();
        const diff = now - startTime;
        // 4. 현재 시간과 시작 시간의 차이를 화면에 보여줄 시간으로 저장한다.
        setTime(diff);

        // 5. 중요!! 다음 타이머의 시작을 1초 뒤가 아닌, 오차 범위를 구해서 실행되도록 한다
        const nextTick = INTERVAL - (diff % INTERVAL);
        timer = setTimeout(updateTime, nextTick);
      }
    };

    // 2. 타이머가 1초 뒤에 updateTime함수를 호출한다
    if (isRunning) {
      timer = setTimeout(updateTime, INTERVAL);
    }

    return () => clearTimeout(timer);
  }, [startTime, isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      // 0. 시작버튼을 누르면 시작시간이 저장되고, 타이머가 실행된다
      setStartTime(Date.now() - time);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const changeFormat = () => {
    setShowFullFormat((prev) => !prev);
  };

  return (
    <div>
      <p>{formatTime(time, showFullFormat)}</p>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <button onClick={changeFormat}>
        {showFullFormat ? 'ss:ms' : 'hh:mm:ss:ms'}
      </button>
    </div>
  );
}
