import { format } from "date-fns";

export default function HeroSection({ startDate, endDate }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-t-3xl">

<img
  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  alt="Calendar background"
  className="w-full h-full object-cover transition duration-700 hover:scale-105"
/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 w-full p-5 flex justify-between text-white">

        <div>
          <p className="text-xs opacity-80">Selected Range</p>
          <h2 className="text-xl font-bold">
            {startDate && endDate
              ? `${format(startDate, "dd MMM")} → ${format(endDate, "dd MMM")}`
              : startDate
              ? format(startDate, "dd MMM yyyy")
              : "Select dates"}
          </h2>
        </div>

        <div className="bg-blue-500/90 px-4 py-2 rounded-xl shadow-lg">
          <p className="text-xs">
            {format(startDate || new Date(), "yyyy")}
          </p>
          <h3>{format(startDate || new Date(), "MMMM")}</h3>
        </div>

      </div>
    </div>
  );
}