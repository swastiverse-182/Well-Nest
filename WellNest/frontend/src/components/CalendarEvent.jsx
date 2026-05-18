import { CalendarDaysIcon } from "@heroicons/react/24/outline";

// helper to format yyyy-mm-dd → dd-mm-yyyy
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}

function CalendarEvent({ event, onDelete }) {
  return (
    <div className="flex justify-between items-start bg-white border border-green-200 rounded-xl px-4 py-4 shadow-sm hover:shadow-md transition">
      <div>
        {/* Title */}
        <h3 className="font-semibold text-lg text-green-800">
          {event.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-green-700 mt-1">
          <CalendarDaysIcon className="w-4 h-4" />
          <span>{formatDate(event.date)}</span>
        </div>

        {/* Description / Notes */}
        {event.description && (
          <p className="mt-2 text-sm text-gray-600">
            {event.description}
          </p>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(event._id)}
        className="text-gray-400 hover:text-red-500 transition text-lg"
      >
        ✕
      </button>
    </div>
  );
}

export default CalendarEvent;
