export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  const getPad = (num: number) => {
    return String(num).padStart(2, "0");
  };

  return `${getPad(hours)}:${getPad(minutes)}:${getPad(seconds)}:${getPad(milliseconds)}`;
};
