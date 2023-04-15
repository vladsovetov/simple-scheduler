import { Button } from "@/components/Button/Button";
import { Dialog } from "@/components/Dialog/Dialog";
import { Field } from "@/components/Field/Field";
import { Input } from "@/components/Input/Input";
import { PillCard } from "@/components/PillCard/PillCard";
import { Pill } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";

const DAY_CELL_MIN_HEIGHT = 50;

const DayStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
`;

const DayLabel = styled.div`
  display: flex;
  flex: none;
  padding: 16px;
  font-size: 24px;
  color: white;
  background-color: green;
  justify-content: center;
`;

const DayGrid = styled.div`
  position: relative;
  flex: 1;
  /* display: flex;
  flex-direction: column; */
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

const DayCurrentTime = styled.div`
  position: absolute;
  width: 100%;
  border-bottom: 4px solid blue;
`;

const PillsContainer = styled.div`
  /* display: flex; */
`;

const HourLabel = styled.div`
  /* background-color: #f5f3f3; */
  color: green;
  padding: 8px;
`;

type DialogProps = {
  open: boolean;
  title: string;
  startTime: number;
};

export default function Day() {
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
  const [newPill, setNewPill] = useState<Partial<Pill>>({});
  const [pills, setPills] = useState<Pill[]>([]);
  const router = useRouter();
  const { date } = router.query;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const nowDate = new Date();
  const nowMinute = nowDate.getMinutes();
  const nowHour = (nowDate.getHours() + nowMinute / 60) * DAY_CELL_MIN_HEIGHT;

  useEffect(() => {
    if (date) {
      fetchPills();
    }
  }, [date]);

  const handleSave = async () => {
    if (!dialogProps) return;

    const pill: Partial<Pill> = {
      ...newPill,
      startDate: String(date),
      startTime: `${dialogProps.startTime.toString().padStart(2, "0")}:00`,
    };
    await fetch("/api/pills/create", {
      method: "POST",
      body: JSON.stringify(pill),
    });
    setDialogProps(null);
    fetchPills();
  };

  const fetchPills = async () => {
    const res = await fetch(`/api/pills/get/${date}`);
    const pills = await res.json();
    setPills(pills);
  };

  return (
    <>
      <DayStyled>
        <DayLabel>{date}</DayLabel>
        <DayGrid>
          {hours.map((hour) => {
            const currHourPills = pills.filter(
              (pill) =>
                pill.startTime === `${hour.toString().padStart(2, "0")}:00`
            );
            return (
              <DayCell
                key={hour}
                onClick={() =>
                  setDialogProps({
                    open: true,
                    title: `Add new pill at ${hour}:00`,
                    startTime: hour,
                  })
                }
              >
                <HourLabel>{hour}</HourLabel>
                <PillsContainer>
                  {currHourPills.map((pill) => (
                    <PillCard
                      key={pill.id}
                      id={pill.id}
                      name={pill.name}
                      quantity={pill.quantity}
                      color={pill.color}
                    />
                  ))}
                </PillsContainer>
              </DayCell>
            );
          })}
          {/* <DayCurrentTime style={{ top: `${nowHour}px` }} /> */}
        </DayGrid>
      </DayStyled>
      {dialogProps && (
        <Dialog
          title={dialogProps.title}
          buttons={
            <>
              <Button variant="secondary" onClick={() => setDialogProps(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          }
          onClose={() => setDialogProps(null)}
        >
          <Field label="Name">
            <Input
              onChange={(value) =>
                setNewPill((prev) => ({ ...prev, name: value }))
              }
            />
          </Field>
          <Field label="Quantity">
            <Input
              onChange={(value) =>
                setNewPill((prev) => ({
                  ...prev,
                  quantity: parseInt(value, 10),
                }))
              }
            />
          </Field>
          <Field label="How many days?">
            <Input
              onChange={(value) =>
                setNewPill((prev) => ({ ...prev, duration: parseInt(value) }))
              }
              type="number"
            />
          </Field>
          <Field label="Color">
            <CirclePicker
              onChange={(color) =>
                setNewPill((prev) => ({ ...prev, color: color.hex }))
              }
            />
          </Field>
        </Dialog>
      )}
    </>
  );
}
