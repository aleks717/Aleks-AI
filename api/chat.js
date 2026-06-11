export default async function handler(req, res) {
  const { message } = await req.json();
  const r = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3.3-70b",
      messages: [{ role: "user", content: message }],
      max_tokens: 2048
    })
  });
  const data = await r.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}