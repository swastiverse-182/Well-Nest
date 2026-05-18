import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import { askAI } from "../api/ai"; // centralized API

const NutritionWellness = () => {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Ask AI (multi-turn chat)
  
  const handleAskAI = async (text) => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    const updatedMessages = [...chatMessages, { role: "user", content: text }];

    try {
      const data = await askAI({ prompt: text, messages: updatedMessages });

      if (data.error) throw new Error(data.error);

      setChatMessages([
        ...updatedMessages,
        { role: "assistant", content: data.answer },
      ]);

      setQuestion("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Backend unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold text-green-700">
          Nutrition & Diet Guidance
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl">
          Nutrition plays a vital role in energy, immunity, and long-term
          health. Explore balanced diet guidance or ask anything related to food, nutrition, and healthy eating.
        </p>
      </section>

      {/* STARTER TOPICS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Start a Conversation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Healthy diet basics"
            description="Balanced nutrition for daily life"
            onClick={() => handleAskAI("What does a healthy and balanced daily diet look like?")}
          />
          <FeatureCard
            title="Weight management"
            description="Sustainable eating habits"
            onClick={() => handleAskAI("What are healthy nutrition tips for managing weight safely?")}
          />
          <FeatureCard
            title="Foods to limit"
            description="Reduce health risks through diet"
            onClick={() => handleAskAI("Which foods should be limited for better long-term health?")}
          />
          <FeatureCard
            title="Nutrition for energy"
            description="Eat better, feel energized"
            onClick={() => handleAskAI("What foods help improve daily energy levels naturally?")}
          />
        </div>
      </section>

      {/* CHAT AREA */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Your Conversation</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                msg.role === "user"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
              <div className="whitespace-pre-wrap mt-1">{msg.content}</div>
            </div>
          ))}
          {loading && <p className="text-gray-600">Thinking… 🥗</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </section>

      {/* INPUT */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Ask About Nutrition</h2>
        <div className="flex gap-3 max-w-xl">
          <textarea
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about diet plans, foods, or nutrition habits…"
            className="flex-1 border rounded-lg px-4 py-2 resize-none"
          />
          <button
            disabled={!question || loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            onClick={() => handleAskAI(question)}
          >
            Send
          </button>
        </div>
      </section>

      {/* TOOLS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Helpful Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Nutrition Info"
            description="Check nutrients in foods"
            to="/tools?tab=nutrition"
          />
          <FeatureCard
            title="BMI Calculator"
            description="Track your body mass index"
            to="/tools?tab=bmi"
          />
        </div>
      </section>
    </div>
  );
};

export default NutritionWellness;
