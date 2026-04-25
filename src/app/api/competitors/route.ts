import { addCompetitor, listCompetitors, scrapeAndStore } from "@/lib/scraper/store";
import { getCurrentUserId } from "@/lib/auth";

const FREE_COMPETITOR_LIMIT = 3;

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const competitors = await listCompetitors(userId);
    return Response.json(competitors);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to list";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await listCompetitors(userId);
  if (existing.length >= FREE_COMPETITOR_LIMIT) {
    return Response.json(
      { error: `Free plan allows up to ${FREE_COMPETITOR_LIMIT} competitors. Upgrade to add more.` },
      { status: 403 }
    );
  }

  const body = await request.json();
  const url = body.url?.trim();

  if (!url || !url.startsWith("http")) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const competitor = await addCompetitor(url, body.name, userId);
    const { snapshot } = await scrapeAndStore(competitor.id, url);

    return Response.json({
      competitor,
      firstSnapshot: {
        title: snapshot.title,
        description: snapshot.description,
        headings: snapshot.headings.slice(0, 5),
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to add";
    return Response.json({ error: message }, { status: 500 });
  }
}
