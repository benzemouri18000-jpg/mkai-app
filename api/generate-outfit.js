export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const prompt = `
Tu es un styliste expert mode pour jeunes de 20 à 25 ans.

OBJECTIF :
Créer des outfits PORTABLES dans la vraie vie.

STYLE ATTENDU :
- streetwear clean (Nike / Uniqlo / Zara vibe)
- techwear soft
- minimal aesthetic
- pinterest / instagram fashion

INTERDIT :
- styles années 2000
- tenues ringardes
- looks trop old school
- incohérences homme/femme

IMPORTANT :
- Les tenues doivent être stylées, simples et modernes
- Pas trop chargé
- Très portable IRL
- Couleurs harmonisées

Réponds en JSON STRICT :

{
  "style_global": "string",
  "haut": "string (ex: t-shirt oversize blanc)",
  "bas": "string (ex: jean loose bleu)",
  "shoes": "string (ex: sneakers blanches nike)",
  "accessories": "string (ex: watch minimal silver)",
  "vibe": "string (ex: clean streetwear aesthetic)"
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

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No AI response" });
    }

    const outfit = JSON.parse(text);

    return res.status(200).json({ outfit });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
