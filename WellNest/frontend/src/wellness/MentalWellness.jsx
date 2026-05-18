import { useState } from "react";
import FeatureCard from "../components/FeatureCard";
import { askAI } from "../api/ai"; //  use centralized API

const MentalWellness = () => {
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
        <h1 className="text-3xl font-bold text-green-700">Mental Wellness</h1>
        <p className="mt-4 text-gray-600 max-w-3xl">
          Mental wellness supports emotional balance, stress management, and mental clarity. 
          You can start with a topic below or ask anything on your mind.
        </p>
      </section>

      {/* STARTER TOPICS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Start a Conversation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Managing stress"
            description="Ways to feel calmer and more balanced"
            onClick={() =>
              handleAskAI("Can you share simple ways to manage stress in daily life?")
            }
          />
          <FeatureCard
            title="Overthinking & anxiety"
            description="Calming racing thoughts"
            onClick={() =>
              handleAskAI("How can someone reduce overthinking and mental anxiety?")
            }
          />
          <FeatureCard
            title="Improving focus"
            description="Mental clarity and concentration tips"
            onClick={() =>
              handleAskAI("What are healthy ways to improve focus and concentration?")
            }
          />
          <FeatureCard
            title="Better sleep"
            description="Relaxation and sleep hygiene"
            onClick={() =>
              handleAskAI("What are some natural ways to improve sleep quality?")
            }
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
          {loading && <p className="text-gray-600">Thinking… 🧠</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </section>

      {/* INPUT */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Ask About Mental Wellness</h2>
        <div className="flex gap-3 max-w-xl">
          <textarea
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message…"
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
            title="Yoga Search"
            description="Explore calming yoga routines"
            to="/tools?tab=yoga"
          />
          <FeatureCard
            title="Wellness Videos"
            description="Watch guided relaxation videos"
            to="/tools?tab=youtube"
          />
        </div>
      </section>
    </div>
  );
};

export default MentalWellness;
