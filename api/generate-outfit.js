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
- Météo : ${weather || "soleil"}
- Genre : ${gender || "homme"}

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
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    console.log("GROQ RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(500).json({
        error: "Groq API error",
        details: data
      });
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({
        error: "No response content",
        details: data
      });
    }

    let outfit;

    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse failed",
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
