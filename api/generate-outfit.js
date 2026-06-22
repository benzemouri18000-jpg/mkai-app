export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender, hasWardrobe } = req.body || {};

    const prompt = `
Tu es un styliste IA.

Dressing utilisateur : ${hasWardrobe ? "OUI" : "NON"}.

Style: ${style}
Météo: ${weather}
Genre: ${gender}

Réponds UNIQUEMENT en JSON :

{
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
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const text = data.choices?.[0]?.message?.content;

    return res.status(200).json({
      outfit: JSON.parse(text)
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
}
