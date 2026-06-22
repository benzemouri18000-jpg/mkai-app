export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender } = req.body || {};

    const prompt = `
Tu es un styliste expert.
Crée une tenue complète réaliste et portable.

Contexte :
- Style : ${style || "streetwear"}
- Météo : ${weather || "inconnue"}
- Genre : ${gender || "homme"}

Réponds UNIQUEMENT en JSON valide, sans texte avant ou après :

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
        model: "gpt-3.5-turbo",
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

    // 🔥 DEBUG ULTRA IMPORTANT
    console.log("OPENAI RESPONSE =>", JSON.stringify(data, null, 2));

    // ❌ Si OpenAI renvoie une erreur
    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI request failed",
        details: data
      });
    }

    // ❌ sécurité structure réponse
    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({
        error: "Invalid OpenAI response structure",
        details: data
      });
    }

    const text = data.choices[0].message.content;

    // ❌ sécurité JSON
    let outfit;
    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON returned by model",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (error) {
    return res.status(500).json({
      error: "Server crash",
      message: error.message
    });
  }
}
