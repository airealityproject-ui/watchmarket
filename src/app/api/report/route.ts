import Anthropic from "@anthropic-ai/sdk";
import { fetchPage } from "@/lib/scraper/fetch-page";

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
  const { description } = await request.json();

  if (!description || description.length < 10) {
    return Response.json({ error: "Describe your product in at least 10 characters" }, { status: 400 });
  }

  // Step 1: Find competitors
  const discoverMsg = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Find 5 direct competitors for this product: "${description}"

Return ONLY a JSON array:
[{"name": "Company", "url": "https://company.com/pricing", "reason": "Why they compete"}]`,
      },
    ],
  });

  const discoverText = discoverMsg.content.find((b) => b.type === "text");
  if (!discoverText || discoverText.type !== "text") {
    return Response.json({ error: "Failed to find competitors" }, { status: 500 });
  }

  let competitors: { name: string; url: string; reason: string }[];
  try {
    const match = discoverText.text.match(/\[[\s\S]*\]/);
    competitors = JSON.parse(match![0]);
  } catch {
    return Response.json({ error: "Failed to parse competitors" }, { status: 500 });
  }

  // Step 2: Scrape each competitor
  const scrapedData = [];
  for (const c of competitors) {
    try {
      const page = await fetchPage(c.url);
      scrapedData.push({
        name: c.name,
        url: c.url,
        reason: c.reason,
        title: page.title,
        description: page.description,
        headings: page.headings.slice(0, 15),
        bodyText: page.bodyText.slice(0, 2000),
      });
    } catch {
      scrapedData.push({
        name: c.name,
        url: c.url,
        reason: c.reason,
        title: "Could not access",
        description: "",
        headings: [],
        bodyText: "",
      });
    }
  }

  // Step 3: Generate report
  const reportMsg = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a competitive intelligence analyst. Create a detailed competitor report.

User's product: "${description}"

Competitor data:
${scrapedData.map((c) => `
## ${c.name}
URL: ${c.url}
Why competitor: ${c.reason}
Page title: ${c.title}
Description: ${c.description}
Key sections: ${c.headings.join(", ")}
Content excerpt: ${c.bodyText.slice(0, 500)}
`).join("\n")}

Write a professional report with:
1. **Executive Summary** (3 sentences)
2. **Competitor Overview** — for each competitor: what they do, their pricing if visible, strengths/weaknesses
3. **Pricing Landscape** — comparison of pricing approaches
4. **Opportunities** — gaps in the market the user can exploit
5. **Recommended Positioning** — how to differentiate

Be specific. Use real data from the scraping. No fluff.`,
      },
    ],
  });

  const reportText = reportMsg.content.find((b) => b.type === "text");

  return Response.json({
    competitors: scrapedData.map((c) => ({
      name: c.name,
      url: c.url,
      reason: c.reason,
    })),
    report: reportText?.type === "text" ? reportText.text : "Failed to generate report",
  });
}
