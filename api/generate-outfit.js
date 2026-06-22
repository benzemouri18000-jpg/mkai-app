export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { images = [], weather = "sunny" } = req.body;

    // 1️⃣ STEP VISION ANALYSIS
    const visionPrompt = `
Analyse ces vêtements et décris-les précisément.

Retourne JSON :
{
  "items": [
    {
      "type": "t-shirt | pantalon | shoes | jacket | accessory",
      "color": "string",
      "style": "streetwear | minimal | classy | techwear",
      "description": "short"
    }
  ]
}
`;

    // ⚠️ IMPORTANT : on simule ici vision (V1 stable)
    // VRAIE VISION = upgrade futur (OpenAI Vision / Replicate)
    const fakeVision = {
      items: images.map((img, i) => ({
        type: i === 0 ? "t-shirt" : i === 1 ? "pants" : "shoes",
        color: "neutral",
        style: "streetwear",
        description: img
      }))
    };

    // 2️⃣ STEP STYLIST AI
    const stylePrompt = `
Tu es un styliste mode 20-25 ans TikTok / Pinterest.

DRESSING UTILISATEUR :
${JSON.stringify(fakeVision.items)}

MÉTÉO :
${weather}

OBJECTIF :
Créer une tenue cohérente avec les vêtements disponibles.

Réponds JSON :

{
  "outfit": {
    "top": "...",
    "bottom": "...",
    "shoes": "...",
    "accessories": "...",
    "vibe": "..."
  }
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
        messages: [{ role: "user", content: stylePrompt }],
        temperature: 0.9
      })
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response", raw: data });
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "JSON parse error", raw: text });
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
