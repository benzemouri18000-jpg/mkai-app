export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender, hasWardrobe } = req.body || {};

    const prompt = `
Tu es un styliste mode expert (niveau Zara / Nike / Pinterest).

RÈGLES IMPORTANTES :
- Les vêtements DOIVENT matcher ensemble
- Cohérence obligatoire (couleurs + style)
- Pas de mélange bizarre
- Tenue moderne 2024-2026 uniquement
- Style global unique par outfit

Tu dois construire UNE TENUE COHÉRENTE.

IMPORTANT :
- Ajoute des keywords visuels précis pour chaque pièce
- Harmonise les couleurs (ex: noir + blanc, beige + crème, bleu + blanc)
- Même vibe sur toute la tenue

Réponds UNIQUEMENT en JSON :

{
  "style_global": "string",

  "color_theme": "string (ex: monochrome noir/blanc, beige minimal, streetwear blue/white)",

  "haut": "string",
  "haut_keywords": "string",

  "bas": "string",
  "bas_keywords": "string",

  "chaussures": "string",
  "shoes_keywords": "string",

  "accessoires": ["string"],
  "acc_keywords": "string",

  "description": "string"
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
      return res.status(500).json({ error: "Empty AI response" });
    }

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON",
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
