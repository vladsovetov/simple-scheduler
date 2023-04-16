import { Button } from "@/components/Button/Button";
import { Dialog } from "@/components/Dialog/Dialog";
import { Field } from "@/components/Field/Field";
import { Input } from "@/components/Input/Input";
import { PillCard } from "@/components/PillCard/PillCard";
import { Pill } from "@/types";
import Router, { useRouter } from "next/router";
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

const Header = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  background-color: #6565f1;
  padding: 16px;
  color: white;
  font-size: 24px;
`;

const DayLabel = styled.div`
  display: flex;
  flex: none;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const SelectedColorContainer = styled.div`
  font-size: 14px;
  display: flex;
  gap: 8px;
  flex-direction: row;
`;

const SelectedColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

type DialogProps = {
  open: boolean;
  title: string;
};

export default function Day() {
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
  const [pillData, setPillData] = useState<Partial<Pill>>({});
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
      ...pillData,
      startDate: String(date),
      startTime: pillData.startTime,
    };
    const URL = pill.id ? "/api/pills/update" : "/api/pills/create";
    await fetch(URL, {
      method: "POST",
      body: JSON.stringify(pill),
    });
    setDialogProps(null);
    fetchPills();
  };

  const handleDelete = async () => {
    if (!dialogProps) return;

    await fetch("/api/pills/remove", {
      method: "POST",
      body: JSON.stringify({
        id: pillData.id,
      }),
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
        <Header>
          <span onClick={() => Router.back()}>{"<-"}</span>
          <DayLabel>{date}</DayLabel>
        </Header>
        <DayGrid>
          {hours.map((hour) => {
            const hourFormatted = `${hour.toString().padStart(2, "0")}:00`;
            const currHourPills = pills.filter(
              (pill) => pill.startTime === hourFormatted
            );
            return (
              <DayCell
                key={hour}
                onClick={() => {
                  setDialogProps({
                    open: true,
                    title: `Add new pill at ${hourFormatted}`,
                  });
                  setPillData({ startTime: hourFormatted });
                }}
              >
                <HourLabel>{hourFormatted}</HourLabel>
                <PillsContainer>
                  {currHourPills.map((pill) => (
                    <PillCard
                      key={pill.id}
                      id={pill.id}
                      name={pill.name}
                      quantity={pill.quantity}
                      color={pill.color}
                      onClick={() => {
                        setDialogProps({
                          open: true,
                          title: `Edit the ${pill.name} pill at ${hourFormatted}`,
                        });
                        setPillData(pill);
                      }}
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
              {!!pillData.id && (
                <Button
                  variant="secondary"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          }
          onClose={() => setDialogProps(null)}
        >
          <Field label="Name">
            <Input
              defaultValue={pillData.name}
              onChange={(value) =>
                setPillData((prev) => ({ ...prev, name: value }))
              }
            />
          </Field>
          <Field label="Quantity">
            <Input
              defaultValue={pillData.quantity}
              onChange={(value) =>
                setPillData((prev) => ({
                  ...prev,
                  quantity: parseInt(value, 10),
                }))
              }
              type="number"
            />
          </Field>
          <Field label="How many days?">
            <Input
              defaultValue={pillData.duration}
              onChange={(value) =>
                setPillData((prev) => ({ ...prev, duration: parseInt(value) }))
              }
              type="number"
            />
          </Field>
          <Field label="Color">
            <SelectedColorContainer>
              <span>Current color:</span>
              <SelectedColor style={{ backgroundColor: pillData.color }} />
            </SelectedColorContainer>
            <CirclePicker
              onChange={(color) =>
                setPillData((prev) => ({ ...prev, color: color.hex }))
              }
            />
          </Field>
        </Dialog>
      )}
    </>
  );
}
