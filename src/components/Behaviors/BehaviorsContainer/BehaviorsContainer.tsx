import styled from "styled-components";
import { BehaviorIcon } from "../BehaviorIcon/BehaviorIcon";
import { Behavior } from "@/types";
import { useState } from "react";
import {
  BehaviorsDialog,
  BehaviorsDialogProps,
} from "../BehaviorsDialog/BehaviorsDialog";

const BehaviorsContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BehaviorTypesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const BehaviorsButton = styled.button`
  cursor: pointer;
  width: 100%;
  max-width: 160px;
  padding: 16px;
  border: none;
  background-color: #3bdcf8;
  color: #fff;
  border-radius: 9999px;
  align-self: center;
`;

interface BehaviorsContainerProps {
  behaviors: Behavior[];
  hourFormatted: string;
  date: string;
  onUpdate: () => void;
}

export const BehaviorsContainer = ({
  behaviors,
  hourFormatted,
  date,
  onUpdate,
}: BehaviorsContainerProps) => {
  const [dialogProps, setDialogProps] = useState<Pick<
    BehaviorsDialogProps,
    "title" | "behavior"
  > | null>(null);

  const handleDelete = async () => {
    if (!dialogProps) return;

    await fetch("/api/behaviors/remove", {
      method: "POST",
      body: JSON.stringify({
        id: dialogProps.behavior.id,
      }),
    });
    setDialogProps(null);
    onUpdate();
  };

  const handleSave = async (behaviorData: Partial<Behavior>) => {
    if (!dialogProps) return;

    const URL = behaviorData.id
      ? "/api/behaviors/update"
      : "/api/behaviors/create";
    await fetch(URL, {
      method: "POST",
      body: JSON.stringify(behaviorData),
    });
    setDialogProps(null);
    onUpdate();
  };

  return (
    <>
      <BehaviorsContainerWrapper>
        <BehaviorsButton
          onClick={() => {
            setDialogProps({
              title: `Add new behaviors at ${hourFormatted}`,
              behavior: { startTime: hourFormatted },
            });
          }}
        >
          Add behaviors
        </BehaviorsButton>
        {behaviors.map((behavior) => (
          <BehaviorTypesWrapper key={behavior.id}>
            {behavior.types.map((type) => (
              <BehaviorIcon key={type.id} type={type} />
            ))}
          </BehaviorTypesWrapper>
        ))}
      </BehaviorsContainerWrapper>
      {dialogProps && (
        <BehaviorsDialog
          title={dialogProps.title}
          behavior={dialogProps.behavior}
          onCancel={() => setDialogProps(null)}
          onDelete={handleDelete}
          onSave={handleSave}
          onClose={() => setDialogProps(null)}
        />
      )}
    </>
  );
};
