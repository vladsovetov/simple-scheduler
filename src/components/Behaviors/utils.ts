export const getRateColorByLevel = (level: number) => {
  switch (level) {
    case -2:
      return "#FF0000";
    case -1:
      return "#FFA500";
    case 0:
      return "#ffff00da";
    case 1:
      return "#71c511";
    case 2:
      return "#0cd305";
    default:
      return "#ffffff";
  }
};
