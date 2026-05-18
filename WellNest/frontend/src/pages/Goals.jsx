import { useState, useEffect } from "react";
import goalsBg from "../assets/goalsBg.png";
import { useAuth } from "../context/AuthContext";
import { getUserGoals, addGoal, deleteGoal } from "../api/goals";

function Goals() {
  const { user } = useAuth();

  const [goals, setGoals] = useState([]);
  const [healthGoal, setHealthGoal] = useState("");
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [loading, setLoading] = useState(true);

  /*  Load goals from backend */
  useEffect(() => {
    if (!user?._id) return;

    const loadGoals = async () => {
      try {
        const data = await getUserGoals();

        const combined = [
          ...data.healthGoals.map((g, i) => ({
            id: `h-${i}`,
            text: g,
            category: "health",
            completed: false,
          })),
          ...data.workoutGoals.map((g, i) => ({
            id: `w-${i}`,
            text: g,
            category: "workout",
            completed: false,
          })),
        ];

        setGoals(combined);
      } catch (err) {
        console.error("Failed to load goals");
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [user?._id]);

  /*  Add goal */
  const handleAddGoal = async (text, category) => {
    if (!text.trim()) return;

    const data = await addGoal({
      healthGoal: category === "health" ? text : "",
      workoutGoal: category === "workout" ? text : "",
    });

    const updated = [
      ...data.healthGoals.map((g, i) => ({
        id: `h-${i}`,
        text: g,
        category: "health",
        completed: false,
      })),
      ...data.workoutGoals.map((g, i) => ({
        id: `w-${i}`,
        text: g,
        category: "workout",
        completed: false,
      })),
    ];

    setGoals(updated);
  };

  /*  Toggle completed (frontend-only UX) */
  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  };

  /*  Delete goal */
  const handleDeleteGoal = async (goal) => {
    const index = goals
      .filter((g) => g.category === goal.category)
      .findIndex((g) => g.id === goal.id);

    const data = await deleteGoal({
      type: goal.category,
      index,
    });

    const updated = [
      ...data.healthGoals.map((g, i) => ({
        id: `h-${i}`,
        text: g,
        category: "health",
        completed: false,
      })),
      ...data.workoutGoals.map((g, i) => ({
        id: `w-${i}`,
        text: g,
        category: "workout",
        completed: false,
      })),
    ];

    setGoals(updated);
  };

  if (loading) {
    return <p className="text-center mt-20">Loading goals...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 sm:py-16 px-4 sm:px-6 sm:bg-fixed"
      style={{ backgroundImage: `url(${goalsBg})` }}
    >
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-8 sm:mb-12 text-center">
          Your Wellness Goals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <GoalSection
            title="Health Goals"
            subtitle="Weight, sleep, hydration, habits"
            placeholder="Lose 2 kg, sleep 8 hours..."
            color="green"
            value={healthGoal}
            onChange={setHealthGoal}
            onAdd={() => {
              handleAddGoal(healthGoal, "health");
              setHealthGoal("");
            }}
            goals={goals.filter((g) => g.category === "health")}
            onToggle={toggleGoal}
            onDelete={handleDeleteGoal}
          />

          <GoalSection
            title="Workout Goals"
            subtitle="Strength, flexibility, endurance"
            placeholder="Build biceps, plank 2 mins..."
            color="blue"
            value={workoutGoal}
            onChange={setWorkoutGoal}
            onAdd={() => {
              handleAddGoal(workoutGoal, "workout");
              setWorkoutGoal("");
            }}
            goals={goals.filter((g) => g.category === "workout")}
            onToggle={toggleGoal}
            onDelete={handleDeleteGoal}
          />
        </div>
      </div>
    </div>
  );
}

/*  COMPONENTS  */

function GoalSection({
  title,
  subtitle,
  placeholder,
  color,
  value,
  onChange,
  onAdd,
  goals,
  onToggle,
  onDelete,
}) {
  const theme =
    color === "green"
      ? {
          box: "bg-green-50 border-green-200",
          button: "bg-green-600 hover:bg-green-700",
          ring: "focus:ring-green-500",
        }
      : {
          box: "bg-blue-50 border-blue-200",
          button: "bg-blue-600 hover:bg-blue-700",
          ring: "focus:ring-blue-500",
        };

  return (
    <div className={`rounded-2xl border p-5 sm:p-8 shadow-md ${theme.box}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
        {title}
      </h2>
      <p className="text-gray-600 mb-5 text-sm sm:text-base">
        {subtitle}
      </p>

      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <input
          className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.ring}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          onClick={onAdd}
          className={`${theme.button} text-white px-6 py-3 rounded-xl transition w-full lg:w-auto`}
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {goals.length === 0 && (
          <p className="text-gray-500 text-sm">No goals yet</p>
        )}

        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onToggle={onToggle}
            onDelete={() => onDelete(goal)}
          />
        ))}
      </div>
    </div>
  );
}

function GoalItem({ goal, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm hover:shadow transition">
      <div
        onClick={() => onToggle(goal.id)}
        className={`cursor-pointer break-words ${
          goal.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {goal.text}
      </div>

      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

export default Goals;
