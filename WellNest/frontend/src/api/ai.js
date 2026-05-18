const BASE_URL = `${import.meta.env.VITE_API_URL}/ai`;

//  AI ASK 
export const askAI = async ({
  prompt,
  messages = [],
  mode = "mental",
}) => {
  try {
    const res = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        messages,
        mode,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "AI request failed");
    }

    return data;
  } catch (err) {
    console.error("AI API error:", err.message);
    return { error: err.message };
  }
};
