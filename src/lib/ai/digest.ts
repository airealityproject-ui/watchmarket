import Anthropic from "@anthropic-ai/sdk";
import { PageDiff } from "@/lib/scraper/diff";

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("Missing ANTHROPIC_API_KEY");
    _client = new Anthropic({ apiKey: key });
  }
  return _client;
}

interface DigestInput {
  competitorName: string;
  url: string;
  diff: PageDiff;
  currentTitle: string;
  currentDescription: string;
  currentHeadings: string[];
}

export async function generateDigest(inputs: DigestInput[]): Promise<string> {
  const changedInputs = inputs.filter((i) => i.diff.significantChange);

  if (changedInputs.length === 0) {
    return "No significant changes detected across your competitors today.";
  }

  const competitorSummaries = changedInputs
    .map((i) => {
      const parts = [`## ${i.competitorName} (${i.url})`];

      if (i.diff.titleChanged) {
        parts.push(`- Title changed: "${i.diff.oldTitle}" → "${i.diff.newTitle}"`);
      }
      if (i.diff.descriptionChanged) {
        parts.push(
          `- Description changed: "${i.diff.oldDescription}" → "${i.diff.newDescription}"`
        );
      }
      if (i.diff.addedHeadings.length > 0) {
        parts.push(`- New sections added: ${i.diff.addedHeadings.join(", ")}`);
      }
      if (i.diff.removedHeadings.length > 0) {
        parts.push(`- Sections removed: ${i.diff.removedHeadings.join(", ")}`);
      }
      parts.push(`- Text similarity: ${Math.round(i.diff.textSimilarity * 100)}%`);
      parts.push(`- Current headings: ${i.currentHeadings.slice(0, 10).join(", ")}`);

      return parts.join("\n");
    })
    .join("\n\n");

  const message = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a competitive intelligence analyst. Analyze these competitor website changes and write a brief, actionable digest.

For each competitor with changes:
1. Summarize WHAT changed in plain language
2. Explain WHY it might matter (pricing shift? new feature? market signal?)
3. Suggest ONE action the reader could take

Be concise. No fluff. Write like a sharp analyst briefing a busy founder.

Changes detected:

${competitorSummaries}`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock?.text || "Failed to generate digest.";
}
