import express from "express";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const aiEnabled = process.env.AI_ENABLED === "true";
  const apiKey = process.env.GEMINI_API_KEY;

  if (!aiEnabled || !apiKey) {
    return res.status(503).json({ error: "AI service is disabled" });
  }

  const { prompt, messages, mode = "mental" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  try {
    // SYSTEM CONTEXT (SMART)
    let systemPrompt = "";

    if (mode === "food") {
      systemPrompt = `
You are a certified nutrition assistant.
Give clear, evidence-based food guidance.

Always respond in this format:

Recommended foods:
- item
- item

Foods to avoid:
- item
- item
`;
    } else {
      systemPrompt = `
You are a calm, empathetic mental wellness assistant.
Respond kindly and continue the conversation naturally.
`;
    }

    let conversation = systemPrompt + "\n";

    if (Array.isArray(messages)) {
      for (const msg of messages) {
        conversation += `${
          msg.role === "user" ? "User" : "Assistant"
        }: ${msg.content}\n`;
      }
    }

    conversation += `User: ${prompt}`;

    // GEMINI CALL - Explicitly targeting your active Gemini 2.5 Flash engine
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: conversation }],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(" GEMINI RAW ERROR:", data);
      throw new Error("Gemini request failed");
    }

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help. Please tell me more.";

    res.json({ answer });
  } catch (err) {
    console.error(" GEMINI ERROR ", err.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;