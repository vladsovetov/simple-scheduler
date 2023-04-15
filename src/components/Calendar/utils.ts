import { CalendarCellProps } from "./CalendarCell";

export const getCalendarCells = (
  year: number,
  month: number
): CalendarCellProps[] => {
  const cells: CalendarCellProps[] = [];
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const nowDate = new Date();
  for (let day = 1; day < lastDayOfMonth.getDate(); day++) {
    const currDate = new Date(year, month, day);
    const dayOfWeek = currDate.getDay();
    cells.push({
      date: currDate,
      column: dayOfWeek === 0 ? 7 : dayOfWeek,
      isCurrentDay: currDate.toDateString() === nowDate.toDateString(),
    });
  }

  return cells;
};
