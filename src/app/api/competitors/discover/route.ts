import Anthropic from "@anthropic-ai/sdk";
import { getCurrentUserId } from "@/lib/auth";

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("Missing ANTHROPIC_API_KEY");
    _client = new Anthropic({ apiKey: key });
  }
  return _client;
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { description } = await request.json();
  if (!description || description.length < 10) {
    return Response.json(
      { error: "Please describe your product in at least 10 characters" },
      { status: 400 }
    );
  }

  const message = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a competitive intelligence expert. A user describes their product below. Find 5 direct competitors and return their pricing page URLs.

User's product: "${description}"

Return ONLY a JSON array of objects with these fields:
- name: competitor company name
- url: their pricing page URL (must be a real, working URL)
- reason: one sentence why they're a competitor

Example format:
[{"name": "Acme Corp", "url": "https://acme.com/pricing", "reason": "Direct competitor in the same market segment"}]

Return ONLY the JSON array, no other text.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return Response.json({ error: "Failed to generate suggestions" }, { status: 500 });
  }

  try {
    const suggestions = JSON.parse(textBlock.text);
    return Response.json({ suggestions });
  } catch {
    return Response.json({ error: "Failed to parse suggestions" }, { status: 500 });
  }
}
