import { format, isToday } from "date-fns";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function DayCell({
  day,
  range,
  hasNote,
  isDragging,
  focusedDate
}) {
  const isStart = range.isStart(day);
  const isEnd = range.isEnd(day);
  const inRange = range.isInRange(day);
  const today = isToday(day);
  const isSunday = day.getDay() === 0;

  const isFocused =
    focusedDate &&
    day.toDateString() === focusedDate.toDateString();

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}

      onMouseDown={() => range.selectDate(day)}
      onMouseEnter={() => {
        if (isDragging) range.selectDate(day);
      }}

      className={clsx(
        "p-2 text-center rounded-lg cursor-pointer text-sm relative",
        "transition-all duration-200 ease-out",
        "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",

        today && "border border-blue-500",

        isStart && "bg-blue-600 text-white rounded-l-full",
        isEnd && "bg-blue-600 text-white rounded-r-full",

        inRange &&
          "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 dark:from-blue-900 dark:via-blue-700 dark:to-blue-900",

        isFocused && "ring-2 ring-yellow-400",
        isSunday && "text-red-500"
      )}
    >
      {format(day, "d")}

      {/* DOTS */}
      <div className="flex justify-center gap-1 mt-1">
        {hasNote && (
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
        )}
        {isSunday && (
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
        )}
      </div>
    </motion.div>
  );
}