const API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function askGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY manquante.");
  }

  const url = `${API_BASE}?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const data = await response.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!answer) {
    throw new Error("Reponse vide ou format inconnu.");
  }

  return answer;
}

module.exports = { askGemini };
