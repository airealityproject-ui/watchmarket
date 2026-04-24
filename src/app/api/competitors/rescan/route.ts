import { getSupabase } from "@/lib/supabase";
import { scrapeAndStore, getLatestSnapshots } from "@/lib/scraper/store";
import { diffSnapshots } from "@/lib/scraper/diff";
import { PageSnapshot } from "@/lib/scraper/fetch-page";

export async function POST() {
  const { data: competitors } = await getSupabase()
    .from("competitors")
    .select("*");

  if (!competitors || competitors.length === 0) {
    return Response.json({ message: "No competitors to scan" });
  }

  const results = [];

  for (const c of competitors) {
    try {
      const oldSnapshots = await getLatestSnapshots(c.id, 1);
      await scrapeAndStore(c.id, c.url);
      const newSnapshots = await getLatestSnapshots(c.id, 1);

      if (oldSnapshots.length > 0 && newSnapshots.length > 0) {
        const oldSnap: PageSnapshot = {
          url: c.url,
          title: oldSnapshots[0].title || "",
          description: oldSnapshots[0].description || "",
          headings: oldSnapshots[0].headings || [],
          bodyText: oldSnapshots[0].body_text || "",
          links: oldSnapshots[0].links || [],
          scrapedAt: oldSnapshots[0].scraped_at,
        };
        const newSnap: PageSnapshot = {
          url: c.url,
          title: newSnapshots[0].title || "",
          description: newSnapshots[0].description || "",
          headings: newSnapshots[0].headings || [],
          bodyText: newSnapshots[0].body_text || "",
          links: newSnapshots[0].links || [],
          scrapedAt: newSnapshots[0].scraped_at,
        };

        const diff = diffSnapshots(oldSnap, newSnap);
        results.push({ competitor: c.name, diff });
      } else {
        results.push({ competitor: c.name, diff: null, note: "First scan" });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed";
      results.push({ competitor: c.name, error: message });
    }
  }

  return Response.json({ scanned: results.length, results });
}
