import ReactDOM from "react-dom";
import { Button } from "@/components/Button/Button";
import { Dialog } from "@/components/Dialog/Dialog";
import { Field } from "@/components/Field/Field";
import { Behavior, BehaviorType, BehaviorTypeEnum } from "@/types";
import { useState } from "react";
import { RateInput } from "@/components/RateInput/RateInput";
import { BEHAVIOR_TYPES_MAP } from "../constants";

export interface BehaviorsDialogProps {
  title: string;
  behavior: Partial<Behavior>;
  onCancel: () => void;
  onDelete: () => void;
  onClose: () => void;
  onSave: (behavior: Partial<Behavior>) => void;
}

export const BehaviorsDialog = ({
  title,
  behavior,
  onCancel,
  onDelete,
  onClose,
  onSave,
}: BehaviorsDialogProps) => {
  const [behaviorData, setBehaviorData] = useState<Partial<Behavior>>(behavior);

  const handleBehaviorTypeUpdate = (type: BehaviorTypeEnum, level: number) => {
    let types: BehaviorType[] = [];
    const typeIndex = behaviorData.types?.findIndex((t) => t.id === type) ?? -1;
    if (typeIndex !== -1) {
      types =
        behaviorData.types?.map((t) => {
          if (t.id === type) {
            return {
              ...t,
              level,
            } as BehaviorType;
          }
          return t;
        }) ?? [];
    } else {
      types = [
        ...(behaviorData.types ?? []),
        {
          id: type,
          level,
        },
      ];
    }
    setBehaviorData({
      ...behavior,
      types,
    });
  };

  return ReactDOM.createPortal(
    <Dialog
      title={title}
      buttons={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          {!!behaviorData.id && (
            <Button variant="secondary" color="error" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button variant="primary" type="submit" form="behavior-form">
            Save
          </Button>
        </>
      }
      onClose={onClose}
    >
      <form
        id="behavior-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(behaviorData);
        }}
      >
        {Object.values(BehaviorTypeEnum).map((behaviorType) => {
          const type = behaviorData.types?.find(
            (type) => type.id === behaviorType
          );
          return (
            <Field key={behaviorType} label={BEHAVIOR_TYPES_MAP[behaviorType]}>
              <RateInput
                value={type?.level}
                onChange={(level) =>
                  handleBehaviorTypeUpdate(behaviorType, level)
                }
              />
            </Field>
          );
        })}
      </form>
    </Dialog>,
    document.getElementById("portal") as HTMLElement
  );
};
