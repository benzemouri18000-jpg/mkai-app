export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { weather = "sunny", wardrobe = [] } = req.body;

    const prompt = `
Tu es un styliste mode expert pour jeunes 20-25 ans (TikTok / Pinterest aesthetic).

OBJECTIF :
Créer une tenue complète cohérente et stylée.

CONTEXTE :
- météo: ${weather}
- dressing utilisateur: ${JSON.stringify(wardrobe)}

STYLES AUTORISÉS :
- streetwear clean
- minimal aesthetic
- classy casual
- techwear soft
- workwear moderne

RÈGLES ABSOLUES :
- tenue réaliste (Zara / Nike / Uniqlo vibe)
- couleurs harmonisées
- adaptée météo
- uniquement vêtements portables IRL

IMPORTANT :
Si wardrobe contient des vêtements → utilise-les obligatoirement.

Réponds en JSON STRICT :

{
  "style": "string",
  "weather_fit": "string",

  "top": "string",
  "bottom": "string",
  "shoes": "string",
  "accessories": "string",

  "color_palette": "string",
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

    const text = data?.choices?.0?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response", raw: data });
    }

    let outfit;
    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "JSON error", raw: text });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
