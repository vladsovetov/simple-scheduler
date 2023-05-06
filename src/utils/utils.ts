export const formatTime = (hour: number): string => {
  return hour < 10 ? `0${hour}:00` : `${hour}:00`;
};

export const getHourFromTime = (time: string): number => {
  const timeArr = time.split(":");
  return timeArr ? parseInt(timeArr[0]) : 0;
};
