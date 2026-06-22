export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { wardrobe = [], weather = "sunny" } = req.body;

    const prompt = `
Tu es un styliste mode expert 20-25 ans inspiré TikTok / Pinterest.

OBJECTIF :
Créer une tenue stylée cohérente et portable IRL.

CONTEXTE :
- météo: ${weather}
- dressing utilisateur: ${JSON.stringify(wardrobe)}

STYLES :
streetwear, minimal, classy, techwear soft, workwear

RÈGLES :
- tenue cohérente
- couleurs harmonisées
- style moderne 2024-2026
- utiliser le dressing si possible

Réponds UNIQUEMENT en JSON :

{
  "style": "string",
  "top": "string",
  "bottom": "string",
  "shoes": "string",
  "accessories": "string",
  "vibe": "string"
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
        temperature: 0.9
      })
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response", raw: data });
    }

    let outfit;
    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "JSON parse error", raw: text });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
