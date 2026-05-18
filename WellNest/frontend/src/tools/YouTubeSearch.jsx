import { useState } from "react";

/* Block clearly non-wellness topics */
const isNonWellnessQuery = (query) => {
  const blockedTerms = [
    "movie", "movies", "film", "trailer",
    "song", "music", "lyrics", "web series",
    "episode", "gaming", "game", "comedy",
    "standup", "review", "tv show", "series"
  ];

  const q = query.toLowerCase();
  return blockedTerms.some((term) => q.includes(term));
};

function YouTubeWellnessSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    if (!query.trim()) {
      setError("Please enter a wellness topic");
      return;
    }

    /* Stop non-wellness searches */
    if (isNonWellnessQuery(query)) {
      setError(
        "Please search for wellness topics like yoga, meditation, exercise, relaxation, or mental health."
      );
      setVideos([]);
      return;
    }

    setLoading(true);
    setError("");
    setVideos([]);

    try {
      /* Bias YouTube towards wellness */
      const searchQuery = `${query} health wellness`;

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
          searchQuery
        )}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setLoading(false);
        return;
      }

      if (!data.items || data.items.length === 0) {
        setError("No wellness videos found");
        setLoading(false);
        return;
      }

      setVideos(data.items.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
        Wellness Videos Search
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search yoga, stress relief, meditation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
        />
        <button
          onClick={fetchVideos}
          className="w-full sm:w-auto px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition text-base"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-700 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Video Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col w-full"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-48 sm:h-52 rounded-lg object-cover mb-2"
            />
            <h4 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-1">
              {video.snippet.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">{video.snippet.channelTitle}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default YouTubeWellnessSearch;
