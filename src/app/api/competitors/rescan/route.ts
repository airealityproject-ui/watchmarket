import { getSupabase } from "@/lib/supabase";
import { scrapeAndStore, getLatestSnapshots } from "@/lib/scraper/store";
import { diffSnapshots } from "@/lib/scraper/diff";
import { generateDigest } from "@/lib/ai/digest";
import { PageSnapshot } from "@/lib/scraper/fetch-page";

function toPageSnapshot(row: Record<string, unknown>, url: string): PageSnapshot {
  return {
    url,
    title: (row.title as string) || "",
    description: (row.description as string) || "",
    headings: (row.headings as string[]) || [],
    bodyText: (row.body_text as string) || "",
    links: (row.links as { text: string; href: string }[]) || [],
    scrapedAt: row.scraped_at as string,
  };
}

export async function POST() {
  const { data: competitors } = await getSupabase()
    .from("competitors")
    .select("*");

  if (!competitors || competitors.length === 0) {
    return Response.json({ message: "No competitors to scan" });
  }

  const results = [];
  const digestInputs = [];

  for (const c of competitors) {
    try {
      const oldSnapshots = await getLatestSnapshots(c.id, 1);
      await scrapeAndStore(c.id, c.url);
      const newSnapshots = await getLatestSnapshots(c.id, 1);

      if (oldSnapshots.length > 0 && newSnapshots.length > 0) {
        const oldSnap = toPageSnapshot(oldSnapshots[0], c.url);
        const newSnap = toPageSnapshot(newSnapshots[0], c.url);
        const diff = diffSnapshots(oldSnap, newSnap);

        results.push({ competitor: c.name, diff });
        digestInputs.push({
          competitorName: c.name,
          url: c.url,
          diff,
          currentTitle: newSnap.title,
          currentDescription: newSnap.description,
          currentHeadings: newSnap.headings,
        });
      } else {
        results.push({ competitor: c.name, diff: null, note: "First scan" });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed";
      results.push({ competitor: c.name, error: message });
    }
  }

  let digest: string | null = null;
  try {
    digest = await generateDigest(digestInputs);
  } catch {
    digest = null;
  }

  return Response.json({ scanned: results.length, results, digest });
}
