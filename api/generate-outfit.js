export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { style, weather, gender } = req.body;

    const prompt = `
Tu es un styliste.
Style: ${style}
Météo: ${weather}
Genre: ${gender}

Réponds uniquement en JSON valide :
{
  "haut": "exemple",
  "bas": "exemple",
  "chaussures": "exemple",
  "accessoires": ["exemple"],
  "description": "exemple"
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
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();

    const text = data.choices[0].message.content;

    res.status(200).json({
      outfit: JSON.parse(text)
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      debug: "API crash"
    });
  }
}
