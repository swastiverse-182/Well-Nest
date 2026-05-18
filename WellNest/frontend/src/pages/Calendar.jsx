import { useState, useEffect } from "react";
import CalendarEvent from "../components/CalendarEvent";
import calendarBg from "../assets/calendarBg.png";
import {
  fetchEvents,
  createEvent,
  removeEvent,
} from "../api/calendar";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);

  //  Load events from backend on page load
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  //  Add new event
  const addEvent = async () => {
    if (!title || !date) return;

    try {
      const savedEvent = await createEvent({
        title,
        date,
        description: details, // map frontend details → backend description
      });

      setEvents((prev) => [...prev, savedEvent]);

      setTitle("");
      setDate("");
      setDetails("");
    } catch (err) {
      console.error("Failed to save event", err);
    }
  };

  //  Delete event
  const deleteEvent = async (id) => {
    try {
      await removeEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 sm:py-16 px-4"
      style={{ backgroundImage: `url(${calendarBg})` }}
    >
      {/* Main container */}
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-8 sm:mb-12 text-center">
           Wellness Calendar
        </h1>

        {/* Add Event Section */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-8 shadow-md mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Add Health Event
          </h2>

          <div className="flex flex-col lg:flex-row gap-3 mb-4">
            <input
              className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Event title (Yoga, Doctor visit...)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="date"
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={addEvent}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition w-full lg:w-auto"
            >
              Add
            </button>
          </div>

          <textarea
            className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Details / notes (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Events List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500 text-center">No events added yet 🌱</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <CalendarEvent
                key={event._id}
                event={event}
                onDelete={deleteEvent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
