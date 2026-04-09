import { format } from "date-fns";
import { useCalendar } from "../../hooks/useCalendar";
import WeekHeader from "./WeekHeader";
import DayCell from "./DayCell";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CalendarGrid({
  currentDate,
  nextMonth,
  prevMonth,
  range,
  notesMap
}) {
  const days = useCalendar(currentDate);

  const [isDragging, setIsDragging] = useState(false);
  const [focusedDate, setFocusedDate] = useState(new Date());

  useEffect(() => {
    const handleKey = (e) => {
      let newDate = new Date(focusedDate);

      if (e.key === "ArrowRight") newDate.setDate(newDate.getDate() + 1);
      if (e.key === "ArrowLeft") newDate.setDate(newDate.getDate() - 1);
      if (e.key === "ArrowDown") newDate.setDate(newDate.getDate() + 7);
      if (e.key === "ArrowUp") newDate.setDate(newDate.getDate() - 7);

      if (e.key === "Enter") {
        range.selectDate(newDate);
      }

      setFocusedDate(newDate);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedDate, range]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={format(currentDate, "yyyy-MM")}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="p-4 rounded-2xl 
                   bg-white/70 dark:bg-gray-800/70 
                   backdrop-blur-xl
                   border border-gray-200 dark:border-gray-700
                   shadow-lg hover:shadow-2xl transition"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">

          <button
            onClick={prevMonth}
            className="px-3 py-1 rounded-lg 
                       bg-gray-100 dark:bg-gray-700
                       hover:bg-blue-500 hover:text-white
                       hover:scale-105 active:scale-95
                       transition"
          >
            ←
          </button>

          <h2 className="font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                const today = new Date();
                range.selectDate(today);
                setFocusedDate(today);
              }}
              className="text-xs px-3 py-1 rounded-lg 
                         bg-blue-500 text-white 
                         hover:scale-105 active:scale-95
                         shadow-md hover:shadow-lg
                         transition"
            >
              📍 Today
            </button>

            <button
              onClick={nextMonth}
              className="px-3 py-1 rounded-lg 
                         bg-gray-100 dark:bg-gray-700
                         hover:bg-blue-500 hover:text-white
                         hover:scale-105 active:scale-95
                         transition"
            >
              →
            </button>
          </div>
        </div>

        <WeekHeader />

        {/* DRAG SELECT */}
        <div
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="grid grid-cols-7 gap-2 mt-2"
        >
          {days.map((day, i) => (
            <DayCell
              key={i}
              day={day}
              range={range}
              hasNote={!!notesMap[format(day, "yyyy-MM-dd")]}
              isDragging={isDragging}
              focusedDate={focusedDate}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}