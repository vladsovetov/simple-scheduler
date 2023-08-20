import { BehaviorTypeEnum } from "@/types";

export const BEHAVIOR_TYPES_MAP: Record<BehaviorTypeEnum, string> = {
  [BehaviorTypeEnum.mood]: "Настрій",
  [BehaviorTypeEnum.sleep]: "Нічний сон",
  [BehaviorTypeEnum.appetite]: "Апетит",
  [BehaviorTypeEnum.dailyActivity]: "Активніть днем",
  [BehaviorTypeEnum.tiredness]: "Втома",
  [BehaviorTypeEnum.fatigue]: "Втомлюваність",
  [BehaviorTypeEnum.apathy]: "Апатія",
  [BehaviorTypeEnum.badThoughts]: "Погані думки",
};
