import { useState } from "react";
import { getFoodAdvice } from "../api/food";

function SmartFoodAdvisor() {
  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [avoidable, setAvoidable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFoods = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setRecommended([]);
    setAvoidable([]);

    try {
      const data = await getFoodAdvice(query);

      if (data.source === "rules") {
        setRecommended(data.recommended || []);
        setAvoidable(data.avoid || []);
      } else {
        setError("No recommendations found.");
      }
    } catch {
      setError("Backend unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Smart Food Advisor
      </h2>

      <label className="text-sm text-gray-600 mb-2">
        Enter a health condition or benefit
      </label>

      <input
        type="text"
        placeholder="Diabetes, digestion, menstrual health..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-5 py-4
                   focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
      />

      <button
        onClick={fetchFoods}
        className="w-full bg-green-600 text-white py-4 rounded-xl
                   font-semibold hover:bg-green-700 transition mb-6"
      >
        Get Recommendations
      </button>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {(recommended.length > 0 || avoidable.length > 0) && (
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              Recommended Foods
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base">
              {recommended.map((food, idx) => (
                <li key={idx}>{food}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Avoidable Foods
            </h3>
            <ul className="list-disc list-inside space-y-2 text-base">
              {avoidable.map((food, idx) => (
                <li key={idx}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartFoodAdvisor;
