export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { images = [], weather = "sunny" } = req.body;

    // ---------------------------
    // 1. VISION IA (OpenAI)
    // ---------------------------
    const visionResults = [];

    for (const img of images) {

      const visionRes = await fetch("https://api.openai.com/v1/chat/completions", {
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
              content: [
                { type: "text", text: "Analyse ce vêtement. Donne type + couleur + style." },
                { type: "image_url", image_url: { url: img } }
              ]
            }
          ]
        })
      });

      const data = await visionRes.json();

      const text = data?.choices?.[0]?.message?.content || "";

      visionResults.push(text);
    }

    // ---------------------------
    // 2. STYLIST IA (GROQ)
    // ---------------------------

    const prompt = `
Tu es un styliste mode 20-25 ans (TikTok / Pinterest).

DRESSING ANALYSÉ :
${JSON.stringify(visionResults)}

MÉTÉO :
${weather}

OBJECTIF :
Créer une tenue cohérente et stylée.

Réponds JSON :

{
  "style": "streetwear | minimal | classy | techwear",
  "top": "...",
  "bottom": "...",
  "shoes": "...",
  "accessories": "...",
  "vibe": "..."
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
        temperature: 0.9
      })
    });

    const data2 = await response.json();

    const text2 = data2?.choices?.[0]?.message?.content;

    if (!text2) {
      return res.status(500).json({ error: "No AI response", raw: data2 });
    }

    let outfit;
    try {
      outfit = JSON.parse(text2);
    } catch (e) {
      return res.status(500).json({ error: "JSON error", raw: text2 });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
