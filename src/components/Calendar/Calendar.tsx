import { CalendarEvent } from "@/types";
import styled, { css } from "styled-components";
import { getCalendarCells } from "./utils";
import { CalendarCell } from "./CalendarCell";

const CalendarGridColumnsCss = css`
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarHeaderGrid = styled.div`
  display: grid;
  margin-bottom: 8px;
  color: white;
  background-color: #6565f1;
  ${CalendarGridColumnsCss}
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  ${CalendarGridColumnsCss}
`;

const WeekdayLabel = styled.span`
  text-align: center;
  border: 1px solid black;
`;

interface CalendarProps {
  events: CalendarEvent[];
}

export const Calendar = ({ events }: CalendarProps) => {
  const date = new Date();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const cells = getCalendarCells(date.getFullYear(), date.getMonth());
  return (
    <div>
      <CalendarHeaderGrid>
        {weekDays.map((day) => (
          <WeekdayLabel key={day}>{day}</WeekdayLabel>
        ))}
      </CalendarHeaderGrid>
      <CalendarGrid>
        {cells.map(({ date, column, isCurrentDay }) => (
          <CalendarCell
            key={date.toString()}
            date={date}
            column={column}
            isCurrentDay={isCurrentDay}
          />
        ))}
      </CalendarGrid>
    </div>
  );
};
