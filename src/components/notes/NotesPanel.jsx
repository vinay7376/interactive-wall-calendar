import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function NotesPanel({ selectedDate, notesMap, setNotesMap }) {
  const key = format(selectedDate, "yyyy-MM-dd");
  const notes = notesMap[key] || [];

  const [input, setInput] = useState("");

  const addNote = () => {
    if (!input.trim()) return;

    const newNote = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setNotesMap({
      ...notesMap,
      [key]: [...notes, newNote],
    });

    setInput("");
  };

  const deleteNote = (id) => {
    setNotesMap({
      ...notesMap,
      [key]: notes.filter((n) => n.id !== id),
    });
  };

  return (
    <div className="p-5 rounded-2xl 
                    bg-white/10 dark:bg-gray-900/40 
                    backdrop-blur-xl 
                    border border-white/10
                    shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white">
          📌 {format(selectedDate, "dd MMM")}
        </h2>

        <button
          onClick={addNote}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:scale-105 transition"
        >
          + Add
        </button>
      </div>

      {/* INPUT */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Quick add note..."
        className="w-full mb-3 p-2 rounded-lg 
                   bg-black/20 text-white 
                   placeholder-gray-400
                   border border-gray-700 focus:outline-none"
      />

      {/* NOTES LIST */}
      <div className="space-y-2 max-h-52 overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-xs text-gray-400">No notes yet</p>
        )}

        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl 
                       bg-gradient-to-r from-blue-500/20 to-purple-500/20
                       border border-white/10
                       flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-white">{note.text}</p>
              <p className="text-[10px] text-gray-400">{note.time}</p>
            </div>

            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-400 hover:scale-110"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}