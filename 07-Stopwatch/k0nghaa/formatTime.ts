function pad(num: number, length = 2) {
  return String(num).padStart(length, '0');
}

export function formatTime(ms: number, showHours: boolean) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  if (showHours) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  }
  return `${pad(seconds)}:${pad(milliseconds)}`;
}
