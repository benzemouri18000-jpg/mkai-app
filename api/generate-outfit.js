export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender } = req.body || {};

    const prompt = `
Tu es un styliste mode expert.

OBJECTIF :
Créer UNE tenue cohérente et moderne.

RÈGLES :
- Tenue 100% moderne (2024-2026)
- Aucun mélange incohérent
- Couleurs harmonisées
- Style unique par outfit

Tu dois répondre en JSON STRICT :

{
  "haut": "string simple",
  "bas": "string simple",
  "shoes": "string simple",
  "accessories": "string simple",
  "color_theme": "string",
  "style_global": "string"
}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response" });
    }

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse error",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
