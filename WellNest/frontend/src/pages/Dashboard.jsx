import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserGoals } from "../api/goals";
import { fetchEvents } from "../api/calendar";

function Dashboard() {
  const { user } = useAuth();

  const [healthGoals, setHealthGoals] = useState([]);
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const loadDashboard = async () => {
      try {
        const goalsData = await getUserGoals();
        setHealthGoals(goalsData.healthGoals || []);
        setWorkoutGoals(goalsData.workoutGoals || []);

        const eventsData = await fetchEvents();
        setEvents(eventsData || []);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user?._id]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading your space...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 🌿 Welcome */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome back,
            <span className="text-green-700"> {user?.name}</span> 🌿
          </h1>

          <p className="mt-2 text-gray-600 max-w-xl">
            Here’s a snapshot of your wellness journey — your goals, your plans,
            and the progress you’re building every day.
          </p>
        </div>

        {/*  Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <GoalsCard
            title="Health Goals"
            goals={healthGoals}
            color="green"
            empty="No health goals added yet"
          />

          <GoalsCard
            title="Workout Goals"
            goals={workoutGoals}
            color="blue"
            empty="No workout goals added yet"
          />
        </div>

        {/*  Calendar Events */}
        <EventsCard events={events} />
      </div>
    </div>
  );
}

/*  GOALS CARD  */

function GoalsCard({ title, goals, color, empty }) {
  const theme =
    color === "green"
      ? "text-green-700 border-green-200"
      : "text-blue-700 border-blue-200";

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h2 className={`text-lg font-semibold mb-4 ${theme}`}>
        {title}
      </h2>

      {goals.length === 0 ? (
        <p className="text-sm text-gray-500">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {goals.map((goal, index) => (
            <li
              key={index}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800"
            >
              {goal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*  EVENTS CARD  */

function EventsCard({ events }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-4 text-purple-700">
        Calendar Events
      </h2>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500">
          No events scheduled yet
        </p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-gray-50 rounded-xl px-5 py-4 hover:bg-gray-100 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-gray-800">
                  {event.title}
                </p>

                <span className="text-xs font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {formatDate(event.date)}
                </span>
              </div>

              {event.description && (
                <p className="mt-2 text-sm text-gray-600">
                  {event.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
