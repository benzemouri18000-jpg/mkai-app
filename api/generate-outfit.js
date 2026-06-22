export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender, hasWardrobe } = req.body || {};

    const prompt = `
Tu es un styliste IA expert.

Le client a un dressing : ${hasWardrobe ? "OUI" : "NON"}.

Crée une tenue complète réaliste.

Style: ${style}
Météo: ${weather}
Genre: ${gender}

Réponds UNIQUEMENT en JSON valide :

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
        messages: [
          { role: "user", content: prompt }
        ],
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
      return res.status(500).json({
        error: "No content from AI"
      });
    }

    return res.status(200).json({
      outfit: JSON.parse(text)
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server crash",
      message: err.message
    });
  }
}
