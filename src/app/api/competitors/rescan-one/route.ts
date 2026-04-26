import { getSupabase } from "@/lib/supabase";
import { getCurrentUserId } from "@/lib/auth";
import { scrapeAndStore, getLatestSnapshots } from "@/lib/scraper/store";
import { diffSnapshots } from "@/lib/scraper/diff";
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

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { competitorId } = await request.json();
  if (!competitorId) {
    return Response.json({ error: "Missing competitorId" }, { status: 400 });
  }

  const { data: competitor } = await getSupabase()
    .from("competitors")
    .select("*")
    .eq("id", competitorId)
    .eq("user_id", userId)
    .single();

  if (!competitor) {
    return Response.json({ error: "Competitor not found" }, { status: 404 });
  }

  const oldSnapshots = await getLatestSnapshots(competitor.id, 1);
  await scrapeAndStore(competitor.id, competitor.url);
  const newSnapshots = await getLatestSnapshots(competitor.id, 1);

  let diff = null;
  if (oldSnapshots.length > 0 && newSnapshots.length > 0) {
    const oldSnap = toPageSnapshot(oldSnapshots[0], competitor.url);
    const newSnap = toPageSnapshot(newSnapshots[0], competitor.url);
    diff = diffSnapshots(oldSnap, newSnap);
  }

  return Response.json({ ok: true, diff });
}
