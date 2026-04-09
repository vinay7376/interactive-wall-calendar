import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

import HeroSection from "./components/hero/HeroSection";
import CalendarGrid from "./components/calendar/CalendarGrid";
import NotesPanel from "./components/notes/NotesPanel";
import CalendarLayout from "./components/layout/CalendarLayout";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDateRange } from "./hooks/useDateRange";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useLocalStorage("theme", false);
  const [notesMap, setNotesMap] = useLocalStorage("notes-map", {});

  const range = useDateRange();

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 min-h-screen"
      }
    >
      {/* THEME BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-5 right-5 z-50 px-4 py-2 rounded-xl 
                   backdrop-blur-md bg-white/30 dark:bg-black/30
                   border border-white/20 dark:border-gray-700
                   shadow-lg hover:scale-105 transition"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <CalendarLayout
        hero={
          <HeroSection
            startDate={range.startDate}
            endDate={range.endDate}
          />
        }
        notes={
          <NotesPanel
            selectedDate={range.selectedDate || new Date()} 
            notesMap={notesMap}
            setNotesMap={setNotesMap}
          />
        }
        calendar={
          <CalendarGrid
            currentDate={currentDate}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
            range={range}
            notesMap={notesMap}
          />
        }
      />
    </div>
  );
}

export default App;