import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { style, weather, gender } = req.body;

    const prompt = `
Tu es un styliste.
Donne une tenue complète.

Style: ${style}
Météo: ${weather}
Genre: ${gender}

Réponds en JSON uniquement:
{
  "haut": "",
  "bas": "",
  "chaussures": "",
  "accessoires": [],
  "description": ""
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    res.status(200).json({
      outfit: JSON.parse(completion.choices[0].message.content),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
