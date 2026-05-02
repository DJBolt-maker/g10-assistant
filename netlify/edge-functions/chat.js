export default async (request, context) => {
  const apiKey = Netlify.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    return new Response(JSON.stringify({ error: { message: "API key not configured on server." } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const body = await request.json();

  // gemini-2.0-flash is confirmed working on v1beta
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "content-type": "application/json" },
  });
};

export const config = { path: "/api/chat" };
