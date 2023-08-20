export interface CalendarEvent {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
}

export interface Pill {
  id: number;
  startDate: string;
  startTime: string;
  name: string;
  quantity: number;
  duration: number;
  created: string;
  updated: string;
  color: string;
}

export interface Behavior {
  id: number;
  created: string;
  updated: string;
  startTime: string;
  types: BehaviorType[];
}

export enum BehaviorTypeEnum {
  mood = "mood",
  sleep = "sleep",
  appetite = "appetite",
  dailyActivity = "dailyActivity",
  tiredness = "tiredness",
  fatigue = "fatigue",
  apathy = "apathy",
  badThoughts = "badThoughts",
}
export interface BehaviorType {
  id: BehaviorTypeEnum;
  level: number;
}
