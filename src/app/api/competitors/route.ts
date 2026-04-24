import { addCompetitor, listCompetitors, scrapeAndStore } from "@/lib/scraper/store";

export async function GET() {
  try {
    const competitors = await listCompetitors();
    return Response.json(competitors);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to list";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const url = body.url?.trim();

  if (!url || !url.startsWith("http")) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const competitor = await addCompetitor(url, body.name);
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
