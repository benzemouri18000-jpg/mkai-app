export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const prompt = `
Tu es un styliste expert pour jeunes 20-25 ans.

OBJECTIF :
Créer une tenue cohérente ET structurée.

IMPORTANT :
- Pas de texte libre
- Tout doit être structuré
- Couleurs cohérentes
- Marques réalistes (Nike, Adidas, Zara, Uniqlo)
- Style moderne 2024-2026

Réponds en JSON STRICT :

{
  "style_global": "streetwear clean | minimal | techwear soft",

  "top": {
    "item": "t-shirt | hoodie | jacket",
    "color": "white | black | beige | grey",
    "brand": "nike | zara | uniqlo | no brand"
  },

  "bottom": {
    "item": "jean | cargo | pantalon",
    "color": "blue | black | beige | grey",
    "brand": "zara | uniqlo | levi's"
  },

  "shoes": {
    "item": "sneakers",
    "color": "white | black | beige",
    "brand": "nike | adidas | new balance"
  },

  "accessories": {
    "item": "watch | cap | bag",
    "color": "silver | black | beige",
    "brand": "minimal"
  },

  "vibe": "clean aesthetic outfit 20-25 ans"
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

    const outfit = JSON.parse(text);

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
