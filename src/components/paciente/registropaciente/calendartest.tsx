"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

export default function CalendarTest() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4">
      <DayPicker
        toMonth={new Date(2025, 9)}
        fromMonth={new Date(2024, 6)}
        mode="single"
        selected={date}
        onSelect={setDate}
        // captionLayout="dropdown"
        captionLayout="dropdown"
        defaultMonth={new Date(2024, 6)}
        // startMonth={new Date(2024, 6)}
        // endMonth={new Date(2025, 9)}
      />
    </div>
  );
}
