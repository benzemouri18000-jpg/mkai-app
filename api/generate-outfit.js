export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender } = req.body || {};

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
Donne une tenue complète.

Style: ${style}
Météo: ${weather}
Genre: ${gender}

Réponds UNIQUEMENT en JSON:
{
  "haut": "string",
  "bas": "string",
  "chaussures": "string",
  "accessoires": [],
  "description": "string"
}
            `
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 ULTRA IMPORTANT : on affiche TOUT
    console.log("OPENAI RAW RESPONSE:", data);

    // ❌ erreur OpenAI explicite
    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI FAILED",
        status: response.status,
        details: data
      });
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({
        error: "No content from OpenAI",
        details: data
      });
    }

    let outfit;
    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse failed",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (error) {
    return res.status(500).json({
      error: "SERVER CRASH",
      message: error.message
    });
  }
}
