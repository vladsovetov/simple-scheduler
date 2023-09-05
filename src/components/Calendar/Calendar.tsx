import { CalendarEvent } from "@/types";
import styled, { css } from "styled-components";
import { getCalendarCells } from "./utils";
import { CalendarCell } from "./CalendarCell";
import { useState } from "react";

const CalendarNavigation = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const CalendarNavigationButton = styled.button`
  height: 30px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #6565f1;
  color: white;
  cursor: pointer;
`;

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
  const [date, setDate] = useState(new Date());
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const cells = getCalendarCells(date.getFullYear(), date.getMonth());
  const navigateMonthDate = (direction: number) => {
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + direction);
    setDate(nextMonthDate);
  };
  return (
    <div>
      <CalendarNavigation>
        <CalendarNavigationButton onClick={() => navigateMonthDate(-1)}>
          {" "}
          Prev Month
        </CalendarNavigationButton>
        <CalendarNavigationButton onClick={() => navigateMonthDate(1)}>
          Next Month
        </CalendarNavigationButton>
      </CalendarNavigation>
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
