import { useEffect, useState } from "react";
import { CalendarEvent } from "@/types";
import { Calendar } from "@/components/Calendar/Calendar";

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        id: "1",
        startDate: new Date("2023-04-15T11:00:00"),
        endDate: new Date("2023-04-15T12:00:00"),
        name: "test 1",
      },
    ]);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar events={events} />
    </main>
  );
}
