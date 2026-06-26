export default function formatTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const ms = Math.floor((milliseconds % 1000) / 10);

  const paddedMs = String(ms).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedHours = String(hours).padStart(2, "0");

  if (hours > 0) {
    return `${paddedHours}h ${paddedMinutes}m ${paddedSeconds}s ${paddedMs}ms`;
  }

  if (minutes > 0) {
    return `${paddedMinutes}m ${paddedSeconds}s ${paddedMs}ms`;
  }

  return `${paddedSeconds}s ${paddedMs}ms`;
}
