export default function WeekHeader() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-semibold tracking-wide">
      {days.map((day, index) => (
        <div
          key={day}
          className={`
            py-2 rounded-lg transition-all duration-200

            bg-gray-100 dark:bg-gray-700
            text-gray-600 dark:text-gray-300

            hover:bg-blue-500 hover:text-white hover:scale-105

            ${index === 0 ? "text-red-500 dark:text-red-400" : ""}
          `}
        >
          {day}
        </div>
      ))}
    </div>
  );
}