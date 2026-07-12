const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";

const readTextParts = (parts = []) => {
  if (!Array.isArray(parts)) return "";

  return parts
    .map((part) => {
      if (typeof part === "string") return part;
      if (typeof part?.text === "string") return part.text;
      if (typeof part?.content === "string") return part.content;
      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
};

const extractGeminiReply = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const candidateText = readTextParts(data?.candidates?.[0]?.content?.parts);
  if (candidateText) return candidateText;

  const outputText = readTextParts(data?.output);
  if (outputText) return outputText;

  if (Array.isArray(data?.steps)) {
    for (const step of [...data.steps].reverse()) {
      const stepText =
        readTextParts(step?.output) ||
        readTextParts(step?.content) ||
        readTextParts(step?.response?.output) ||
        readTextParts(step?.response?.content);

      if (stepText) return stepText;
    }
  }

  return "";
};

const buildDashboardContext = (dashboard) => {
  if (!dashboard) {
    return "Live dashboard data is not available yet.";
  }

  return [
    `Connection: ${dashboard.connection ?? "unknown"}`,
    `Temperature: ${dashboard.temperature ?? "unknown"}`,
    `Humidity: ${dashboard.humidity ?? "unknown"}`,
    `Soil moisture: ${dashboard.moisture ?? "unknown"}`,
    `Light intensity: ${dashboard.light ?? "unknown"}`,
    `Device tilt: ${dashboard.tilt ?? "unknown"}`,
  ].join("\n");
};

const buildHistoryContext = (history = []) => {
  if (!Array.isArray(history) || history.length === 0) {
    return "No previous chat history.";
  }

  return history
    .slice(-8)
    .map((item) => `${item.sender === "user" ? "User" : "AgroBot"}: ${item.text}`)
    .join("\n");
};

export const chatWithGemini = async (req, res) => {
  try {
    const { message, dashboard, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "Gemini API key is missing on the backend.",
      });
    }

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
        system_instruction:
          "You are AgroBot, an AgroTech farming assistant. Answer only questions about agriculture, crops, soil, irrigation, farm sensors, and the user's live dashboard. Use the dashboard data when relevant. Keep answers short, practical, and easy for a farmer to act on. If the user asks unrelated questions, politely redirect to farming.",
        input: [
          "Live dashboard data:",
          buildDashboardContext(dashboard),
          "",
          "Recent chat:",
          buildHistoryContext(history),
          "",
          `User question: ${message}`,
        ].join("\n"),
        generation_config: {
          temperature: 0.4,
          thinking_level: "low",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data?.error?.message || "Gemini request failed.",
      });
    }

    const reply = extractGeminiReply(data);

    if (!reply) {
      console.error("Gemini returned an empty response:", JSON.stringify(data, null, 2));
      return res.status(502).json({
        message: "Gemini returned an empty response. Check the Gemini model name and API key.",
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chat request failed:", error);
    return res.status(500).json({
      message: error.message || "Chat request failed.",
    });
  }
};
