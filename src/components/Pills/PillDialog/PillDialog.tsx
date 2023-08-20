import ReactDOM from "react-dom";
import { Button } from "@/components/Button/Button";
import { Dialog } from "@/components/Dialog/Dialog";
import { Field } from "@/components/Field/Field";
import { Input } from "@/components/Input/Input";
import { Pill } from "@/types";
import {
  diffInDaysBetweenDays,
  getHourFromTime,
  formatTime,
} from "@/utils/utils";
import { useState } from "react";
import { CirclePicker } from "react-color";
import styled from "styled-components";

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

export interface PillDialogProps {
  title: string;
  pill: Partial<Pill>;
  date: string;
  onCancel: () => void;
  onDelete: () => void;
  onClose: () => void;
  onSave: (pill: Partial<Pill>) => void;
}

export const PillDialog = ({
  title,
  pill,
  date,
  onCancel,
  onDelete,
  onClose,
  onSave,
}: PillDialogProps) => {
  const [pillData, setPillData] = useState<Partial<Pill>>(pill);
  return ReactDOM.createPortal(
    <Dialog
      title={title}
      buttons={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          {!!pillData.id && (
            <>
              <Button variant="secondary" color="error" onClick={onDelete}>
                Delete
              </Button>
              <Button
                variant="secondary"
                color="error"
                onClick={() => {
                  if (pillData.startDate && typeof date === "string") {
                    onSave({
                      ...pillData,
                      duration: diffInDaysBetweenDays(
                        new Date(date),
                        new Date(pillData.startDate)
                      ),
                    });
                  }
                }}
              >
                Stop this day
              </Button>
            </>
          )}
          <Button variant="primary" type="submit" form="pill-form">
            Save
          </Button>
        </>
      }
      onClose={onClose}
    >
      {!!pill.startDate && (
        <span>Started at: {new Date(pill.startDate).toLocaleString()}</span>
      )}
      <form
        id="pill-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(pillData);
        }}
      >
        <Field label="Name">
          <Input
            defaultValue={pill.name}
            onChange={(value) =>
              setPillData((prev) => ({ ...prev, name: value }))
            }
          />
        </Field>
        <Field label="Quantity">
          <Input
            defaultValue={pill.quantity}
            onChange={(value) =>
              setPillData((prev) => ({
                ...prev,
                quantity: parseFloat(value),
              }))
            }
            type="number"
          />
        </Field>
        <Field label="How many days?">
          <Input
            defaultValue={pill.duration}
            onChange={(value) =>
              setPillData((prev) => ({
                ...prev,
                duration: parseFloat(value),
              }))
            }
            type="number"
          />
        </Field>
        <Field label="Hour">
          <Input
            defaultValue={pill.startTime ? getHourFromTime(pill.startTime) : 0}
            onChange={(value) =>
              setPillData((prev) => ({
                ...prev,
                startTime: formatTime(parseInt(value, 10)),
              }))
            }
            type="number"
          />
        </Field>
        <Field label="Color">
          <SelectedColorContainer>
            <span>Current color:</span>
            <SelectedColor style={{ backgroundColor: pill.color }} />
          </SelectedColorContainer>
          <CirclePicker
            onChange={(color) =>
              setPillData((prev) => ({ ...prev, color: color.hex }))
            }
          />
        </Field>
      </form>
    </Dialog>,
    document.getElementById("portal") as HTMLElement
  );
};
