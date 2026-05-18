import { useState } from "react";

function YogaSearch() {
  const [query, setQuery] = useState("");
  const [poses, setPoses] = useState([]);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchYogaPoses = async () => {
    if (!query) return;

    setError("");
    setPoses([]);

    try {
      const res = await fetch("https://yoga-api-nzy4.onrender.com/v1/poses");
      const data = await res.json();

      const search = query.toLowerCase().trim();

      const filtered = data.filter((pose) => {
        const fields = [
          pose.english_name,
          pose.pose_description,
          pose.pose_benefits,
          pose.sanskrit_name_adapted,
        ];

        return fields.some(
          (field) => field && field.toLowerCase().includes(search)
        );
      });

      if (filtered.length === 0) {
        setError("No poses found. Try balance, strength, stretch.");
      } else {
        setPoses(filtered.slice(0, 6));
      }
    } catch {
      setError("Error fetching yoga poses");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Yoga Pose Finder
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by pose, body part, or benefit"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={fetchYogaPoses}
          className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Find Poses
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poses.map((pose) => (
          <div
            key={pose.id}
            className="border border-gray-200 rounded-2xl p-5 flex flex-col bg-white/80"
          >
            <h4 className="font-semibold text-lg text-gray-900">
              {pose.english_name}
            </h4>

            <p className="text-sm text-gray-500 italic mb-2">
              {pose.sanskrit_name_adapted}
            </p>

            {pose.pose_benefits && (
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">Benefits:</span>{" "}
                {expandedId === pose.id
                  ? pose.pose_benefits
                  : pose.pose_benefits.slice(0, 120) + "..."}
              </p>
            )}

            {pose.pose_benefits && (
              <button
                onClick={() =>
                  setExpandedId(expandedId === pose.id ? null : pose.id)
                }
                className="text-sm font-medium text-green-600 hover:underline self-start mb-4"
              >
                {expandedId === pose.id ? "Show less" : "Read more"}
              </button>
            )}

            {pose.url_png && (
              <img
                src={pose.url_png}
                alt={pose.english_name}
                className="w-full h-48 object-contain rounded-xl bg-gray-50 mt-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YogaSearch;
