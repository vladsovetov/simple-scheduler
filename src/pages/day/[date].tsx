import { Pill } from "@/types";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatTime } from "../../utils/utils";
import { PillsContainer } from "@/components/Pills/PillsContainer/PillsContainer";

const DAY_CELL_MIN_HEIGHT = 50;

const DayStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  background-color: #6565f1;
  padding: 16px;
  color: white;
  font-size: 24px;
`;

const BackIcon = styled.span`
  cursor: pointer;
`;

const DayLabel = styled.div`
  display: flex;
  flex: none;
  justify-content: center;
`;

const DayGrid = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
`;

const DayCell = styled.div`
  min-height: ${DAY_CELL_MIN_HEIGHT}px;
  border-bottom: 1px solid black;
  padding: 8px;
  color: blue;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:hover {
    background-color: #92b2fb;
  }
`;

const HourLabel = styled.div`
  background-color: #6565f1;
  color: white;
  padding: 8px;
  align-self: center;
  border-radius: 50%;
  color: white;
  width: 42px;
  text-align: center;
`;

export default function Day() {
  const [pills, setPills] = useState<Pill[]>([]);
  const router = useRouter();
  const date = String(
    Array.isArray(router.query.date) ? router.query.date[0] : router.query.date
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    if (date) {
      fetchPills();
    }
  }, [date]);

  useEffect(() => {}, [pills]);

  const fetchPills = async () => {
    const res = await fetch(`/api/pills/get/${date}`);
    const pills = await res.json();
    setPills(pills);
  };

  return (
    <>
      <DayStyled>
        <Header>
          <BackIcon onClick={() => Router.back()}>{"<-"}</BackIcon>
          <DayLabel>{date}</DayLabel>
        </Header>
        <DayGrid>
          {hours.map((hour) => {
            const hourFormatted = formatTime(hour);
            const currHourPills = pills.filter(
              (pill) => pill.startTime === hourFormatted
            );
            return (
              <DayCell key={hour}>
                <HourLabel>{hourFormatted}</HourLabel>
                <PillsContainer
                  date={date}
                  pills={currHourPills}
                  hourFormatted={hourFormatted}
                  onUpdate={fetchPills}
                />
              </DayCell>
            );
          })}
        </DayGrid>
      </DayStyled>
    </>
  );
}
