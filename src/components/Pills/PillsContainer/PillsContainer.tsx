import styled from "styled-components";
import { PillCard } from "../PillCard/PillCard";
import { Pill } from "@/types";
import { useState } from "react";
import { PillDialog, PillDialogProps } from "../PillDialog/PillDialog";

const PillsContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PillsButton = styled.button`
  cursor: pointer;
  width: 100%;
  max-width: 160px;
  padding: 16px;
  border: none;
  background-color: #f8903b;
  color: #fff;
  border-radius: 9999px;
  align-self: center;
`;

interface PillsContainerProps {
  pills: Pill[];
  hourFormatted: string;
  date: string;
  onUpdate: () => void;
}

export const PillsContainer = ({
  pills,
  hourFormatted,
  date,
  onUpdate,
}: PillsContainerProps) => {
  const [dialogProps, setDialogProps] = useState<Pick<
    PillDialogProps,
    "title" | "pill"
  > | null>(null);

  const handleDelete = async () => {
    if (!dialogProps) return;

    await fetch("/api/pills/remove", {
      method: "POST",
      body: JSON.stringify({
        id: dialogProps.pill.id,
      }),
    });
    setDialogProps(null);
    onUpdate();
  };

  const handleSave = async (pillData: Partial<Pill>) => {
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
    onUpdate();
  };

  return (
    <>
      <PillsContainerWrapper>
        <PillsButton
          onClick={() => {
            setDialogProps({
              title: `Add new pill at ${hourFormatted}`,
              pill: { startTime: hourFormatted },
            });
          }}
        >
          Add pill
        </PillsButton>
        {pills.map((pill) => (
          <PillCard
            key={pill.id}
            id={pill.id}
            name={pill.name}
            quantity={pill.quantity}
            color={pill.color}
            onClick={() => {
              setDialogProps({
                title: `Edit the ${pill.name} pill at ${hourFormatted}`,
                pill,
              });
            }}
          />
        ))}
      </PillsContainerWrapper>
      {dialogProps && (
        <PillDialog
          title={dialogProps.title}
          pill={dialogProps.pill}
          date={date}
          onCancel={() => setDialogProps(null)}
          onDelete={handleDelete}
          onSave={handleSave}
          onClose={() => setDialogProps(null)}
        />
      )}
    </>
  );
};
