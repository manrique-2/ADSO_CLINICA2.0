"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const dayNames = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "setiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

interface CalendarHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function CalendarHeader({
  selectedDate,
  setSelectedDate,
}: CalendarHeaderProps) {
  const goToPreviousDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  const day = dayNames[selectedDate.getDay()];
  const date = selectedDate.getDate();
  const month = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  return (
    <div className="flex flex-col items-c gap-2 ">
      {/* Línea superior con flechas y "Hoy" */}
      <div className="flex items-center gap-">
        <Button
          size="icon"
          onClick={goToPreviousDay}
          className=" transition cursor-pointer rounded-r-none bg-[#337ab7] hover:bg-[#285e8e] text-white"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          onClick={resetToToday}
          className="text-[16px] font- rounded-none hover:rounded-none text-gray-800 hover:text-blue-600 transition"
        >
          Hoy
        </Button>
        <Button
          size="icon"
          onClick={goToNextDay}
          className=" transition cursor-pointer rounded-l-none bg-[#337ab7] hover:bg-[#285e8e] text-white"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Fecha grande debajo */}
      <div className="text-lg font-">
        {`${capitalize(day)}, ${date} de ${capitalize(month)} ${year}`}
      </div>
    </div>
  );
}

// Función para capitalizar la primera letra
function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
