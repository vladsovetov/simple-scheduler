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
