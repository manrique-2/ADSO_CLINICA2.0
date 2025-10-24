// components/CalendarCard.tsx
"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface CalendarCardProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

export default function CalendarCard({
  selectedDate,
  setSelectedDate,
}: CalendarCardProps) {
  const day = selectedDate.getDate();
  const dayName = dayNames[selectedDate.getDay()];
  const month = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "w-50 rounded-lg shadow-xl flex flex-col items-center justify-center",
        "bg-white text-white font-bold"
      )}
    >
      <div className="text-2xl bg-blue-500 py-2 w-full text-center rounded-t-lg">
        {month}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button onClick={goToPreviousDay} className="cursor-pointer">
          <ChevronLeft className="text-black" />
        </button>
        <div className="text-5xl text-black">{day}</div>
        <button onClick={goToNextDay} className="cursor-pointer">
          <ChevronRight className="text-black" />
        </button>
      </div>
      <div className="text-xl text-blue-500">{dayName}</div>
      <div className="text-xl text-black py-2 border-t w-full text-center">
        {year}
      </div>
    </motion.div>
  );
}
