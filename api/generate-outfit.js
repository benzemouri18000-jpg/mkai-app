export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender } = req.body || {};

    const prompt = `
Tu es un styliste expert.
Crée une tenue complète réaliste.

Contexte :
- Style : ${style || "streetwear"}
- Météo : ${weather || "inconnue"}
- Genre : ${gender || "homme"}

Réponds UNIQUEMENT en JSON valide, sans texte autour :

{
  "haut": "string",
  "bas": "string",
  "chaussures": "string",
  "accessoires": ["string"],
  "description": "string"
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    // 🔥 DEBUG (très important)
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    // Vérification sécurité
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "OpenAI API error",
        details: data
      });
    }

    const text = data.choices[0].message.content;

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse error",
        raw: text
      });
    }

    return res.status(200).json({
      outfit
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      debug: "server crash"
    });
  }
}
