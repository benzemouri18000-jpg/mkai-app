export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { weather = "sunny", style = "streetwear", wardrobe = [] } = req.body;

    const prompt = `
Tu es un styliste mode expert pour jeunes 20-25 ans inspiré TikTok / Pinterest.

OBJECTIF :
Créer une tenue stylée, portable IRL.

CONTEXTE :
- météo: ${weather}
- style demandé: ${style}
- dressing utilisateur: ${JSON.stringify(wardrobe)}

STYLES POSSIBLES :
- streetwear (Nike, Adidas vibe)
- clean minimal
- classy / workwear
- techwear soft
- aesthetic pinterest / Lain vibe

RÈGLES :
- tenue cohérente (couleurs harmonisées)
- adaptée météo
- pas de style dépassé
- doit être portable dans la vraie vie

Réponds en JSON STRICT :

{
  "style": "string",
  "weather_fit": "string",

  "top": {
    "name": "string",
    "color": "string",
    "material": "string"
  },

  "bottom": {
    "name": "string",
    "color": "string"
  },

  "shoes": {
    "name": "string",
    "color": "string"
  },

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
        temperature: 0.8
      })
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON error",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
