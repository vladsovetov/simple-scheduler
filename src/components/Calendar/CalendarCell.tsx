import styled, { CSSProperties } from "styled-components";
import Link from "next/link";

const CalendarCellStyled = styled.div`
  border: 1px solid black;
  padding: 8px;
  height: 100px;
  margin-left: -1px;
  margin-bottom: -1px;
`;

export interface CalendarCellProps {
  column: number;
  date: Date;
  isCurrentDay?: boolean;
}

export const CalendarCell = ({
  date,
  column,
  isCurrentDay = false,
}: CalendarCellProps) => {
  const style: CSSProperties = {};
  const day = date.getDate();
  if (day === 1) {
    style.gridColumn = column;
  }
  if (isCurrentDay) {
    style.backgroundColor = "#92b2fb";
  }
  return (
    <Link
      href={`/day/${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`}
      style={style}
    >
      <CalendarCellStyled>{day}</CalendarCellStyled>
    </Link>
  );
};

// {events.map((event) => (
//   <CalendarEventCard key={event.id} data={event} />
// ))}
