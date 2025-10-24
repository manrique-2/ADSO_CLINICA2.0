// components/CalendarCard.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

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

export default function CalendarCard() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  const day = today.getDate();
  const dayName = dayNames[today.getDay()];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

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
      <div className="text-5xl text-black">{day}</div>
      <div className="text-xl text-blue-500">{dayName}</div>
      <div className="text-xl text-black py-2 border-t w-full text-center">
        {year}
      </div>
    </motion.div>
  );
}
