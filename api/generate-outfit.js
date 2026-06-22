export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    console.log("BODY:", req.body);

    const { style, weather, gender, hasWardrobe } = req.body || {};

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const prompt = `
Tu es un styliste expert mode 2025.

RÈGLES:
- Tenues modernes uniquement (2024-2026)
- Aucune mode ancienne (pas années 2000, pas old school)
- Tenues cohérentes, harmonieuses
- Style: clean / streetwear / minimal / techwear
- Tout doit matcher ensemble

Contexte:
Style: ${style}
Météo: ${weather}
Genre: ${gender}
Dressing utilisateur: ${hasWardrobe ? "OUI" : "NON"}

Réponds UNIQUEMENT en JSON valide:

{
  "style_global": "string",
  "haut": "string",
  "bas": "string",
  "chaussures": "string",
  "accessoires": ["string"],
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
        temperature: 0.8
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Groq API error",
        details: data
      });
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "Empty AI response" });
    }

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON from AI",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({
      error: "Server crash",
      message: err.message
    });
  }
}
