export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const prompt = `
Tu es un styliste mode expert pour jeunes 20-25 ans (TikTok / Pinterest style).

OBJECTIF :
Créer une tenue ULTRA COHÉRENTE et stylée.

STYLES AUTORISÉS :
- streetwear clean
- minimal aesthetic
- classy casual
- techwear soft
- pinterest fashion

RÈGLES :
- tenue cohérente (couleurs harmonisées)
- portable IRL
- pas de styles dépassés
- pas de mélange incohérent

IMPORTANT :
Réponds UNIQUEMENT en JSON valide :

{
  "style": "streetwear | minimal | classy | techwear",
  "color_theme": "black/white | beige | blue/white | monochrome",

  "top": "t-shirt blanc oversize",
  "bottom": "jean bleu loose",
  "shoes": "sneakers blanches",
  "accessories": "watch minimal silver"
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

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response" });
    }

    let outfit;
    try {
      outfit = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "JSON parse error",
        raw: text
      });
    }

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
