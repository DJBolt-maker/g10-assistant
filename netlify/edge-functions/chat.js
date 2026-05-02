export default async (request, context) => {
  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  const body = await request.json();

  // Switch to gemini-1.5-flash for better free-tier reliability
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
};

export const config = { path: "/api/chat" };
