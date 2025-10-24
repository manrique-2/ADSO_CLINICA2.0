"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { on } from "events";

interface CalendarRangeProps {
  onChange?: (range: DateRange | undefined) => void;
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function CalendarRange({ onChange }: CalendarRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  // const [month, setMonth] = React.useState<Date | undefined>(date);
  // const [value, setValue] = React.useState(formatDate(date));

  const formatted =
    date?.from && date.to
      ? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
      : "Seleccionar rango";

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            // id="date"
            className="w-[230px]   justify-between font-normal"
          >
            {/* {value ? value : "Selecionar"} */}
            {formatted}
            {/* <ChevronDownIcon /> */}
            <CalendarIcon className="size-3.5 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            captionLayout="dropdown"
            // month={month}
            // onMonthChange={setMonth}
            onSelect={(range) => {
              setDate(range);
              // setValue(formatDate(date));
              // setOpen(false);
              onChange?.(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
