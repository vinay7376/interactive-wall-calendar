export default function CalendarLayout({ hero, notes, calendar }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6
                    bg-gradient-to-br from-gray-100 to-gray-200
                    dark:from-gray-900 dark:to-black">

      <div className="w-full max-w-4xl rounded-3xl overflow-hidden
                      bg-white/80 dark:bg-gray-900/80
                      backdrop-blur-xl border border-gray-200 dark:border-gray-700
                      shadow-2xl">

        {hero}

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {notes}
          {calendar}
        </div>

      </div>
    </div>
  );
}