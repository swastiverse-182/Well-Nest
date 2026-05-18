import { useState } from "react";
import { getFoodAdvice } from "../api/food"; // Restored your original local function file link

function NutrientInfo() {
  const [food, setFood] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [nutritionError, setNutritionError] = useState("");

  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [avoidable, setAvoidable] = useState([]);
  const [advisorError, setAdvisorError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionLoading, setNutritionLoading] = useState(false);

  // Optimized helper function to guarantee first-try delivery
  const fetchWithRetry = async (url, options = {}, retries = 4, delay = 1000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if ((response.status === 429 || response.status >= 500) && retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  /* Nutrition Data Handler (Optimized to succeed on the first click) */
  const fetchNutrition = async () => {
    if (!food.trim()) return;

    setNutritionLoading(true);
    setNutritionError("");
    setNutrition(null);

    try {
      const targetUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(food)}&pageSize=10&requireAllWords=false&api_key=${import.meta.env.VITE_USDA_API_KEY}`;
      
      const data = await fetchWithRetry(targetUrl, {}, 4, 1000);

      if (!data.foods || data.foods.length === 0) {
        setNutritionError("Food item not found in database");
        return;
      }

      // Priority 1: Search for preferred Foundation/Survey data types
      let validFood = data.foods.find(
        (item) =>
          item.dataType === "Foundation" ||
          item.dataType === "Survey (FNDDS)"
      );

      // Priority 2 Fallback: If not found, use the very first available match instead of failing
      if (!validFood) {
        validFood = data.foods[0];
      }

      const nutrients = validFood.foodNutrients || [];
      
      // Smart matching handling both string names and ID references
      const getValue = (nutrientName) => {
        const match = nutrients.find(
          (n) =>
            n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase())
        );
        return match ? match.value : 0;
      };

      const protein = Number(getValue("Protein"));
      const carbs = Number(getValue("Carbohydrate"));
      const fat = Number(getValue("Total lipid"));
      
      // Fallback calculator if energy fields are unpopulated
      let calories = getValue("Energy");
      if (!calories) {
        calories = (protein * 4 + carbs * 4 + fat * 9).toFixed(1);
      }

      setNutrition({
        name: validFood.description,
        serving: validFood.servingSize || 100,
        calories,
        protein: protein.toFixed(1),
        carbs: carbs.toFixed(1),
        fat: fat.toFixed(1),
      });
    } catch (err) {
      console.error(err);
      setNutritionError("Connection timed out. Please try again.");
    } finally {
      setNutritionLoading(false);
    }
  };

  /* Smart Food Advisor (Your Original Working Rule Engine) */
  const fetchFoods = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAdvisorError("");
    setRecommended([]);
    setAvoidable([]);

    try {
      const data = await getFoodAdvice(query);
      
      if (data && data.source === "rules") {
        setRecommended(data.recommended || []);
        setAvoidable(data.avoid || []);
      } else {
        setAdvisorError("No recommendations found matching this profile");
      }
    } catch (err) {
      console.error("ADVISOR FETCH ERROR:", err);
      setAdvisorError("Failed to load food advice profiles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-14 p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Nutrition & Smart Food Guidance
      </h2>

      {/* INPUTS + BUTTONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Nutrition Input */}
        <div className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Nutrition Info
          </h3>

          <input
            type="text"
            placeholder="Enter food (egg, rice, mushroom)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-5 py-4
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={fetchNutrition}
            disabled={nutritionLoading}
            className="w-full bg-green-600 text-white py-4 rounded-xl
                       font-semibold hover:bg-green-700 transition shadow-sm disabled:bg-gray-400"
          >
            {nutritionLoading ? "Analyzing Data..." : "Get Nutrition"}
          </button>

          {nutritionError && (
            <p className="text-red-500 text-sm text-center font-medium">{nutritionError}</p>
          )}
        </div>

        {/* Smart Advisor Input */}
        <div className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Smart Food Advisor
          </h3>

          <input
            type="text"
            placeholder="Diabetes, immunity, menstrual health..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-5 py-4
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={fetchFoods}
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl
                       font-semibold hover:bg-green-700 transition shadow-sm disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Get Recommendations"}
          </button>

          {advisorError && (
            <p className="text-red-500 text-sm text-center font-medium">{advisorError}</p>
          )}
        </div>
      </div>

      {/* RESULTS DISPLAY PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Nutrition Result Card */}
        <div>
          {nutrition && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-3 text-base shadow-inner">
              <h4 className="text-xl font-bold text-green-800 border-b border-green-200 pb-2">Analysis Result</h4>
              <p><b>Food Profile:</b> {nutrition.name}</p>
              <p><b>Serving Size:</b> {nutrition.serving} g</p>
              <p><b>Caloric Load:</b> {nutrition.calories} kcal</p>
              <p><b>Macronutrient Split:</b></p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
                <li>Protein: {nutrition.protein} g</li>
                <li>Carbohydrates: {nutrition.carbs} g</li>
                <li>Total Lipids (Fat): {nutrition.fat} g</li>
              </ul>
            </div>
          )}
        </div>

        {/* Advisor Result Card */}
        <div>
          {(recommended.length > 0 || avoidable.length > 0) && (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-green-700 border-b border-green-200 pb-1">
                  Recommended Foods
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {recommended.map((f, i) => (
                    <li key={i} className="capitalize">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-red-600 border-b border-red-200 pb-1">
                  Foods to Avoid
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {avoidable.map((f, i) => (
                    <li key={i} className="capitalize">{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NutrientInfo;