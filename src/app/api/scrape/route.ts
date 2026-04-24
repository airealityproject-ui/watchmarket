import { fetchPage } from "@/lib/scraper/fetch-page";

export async function POST(request: Request) {
  const body = await request.json();
  const url = body.url?.trim();

  if (!url || !url.startsWith("http")) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const snapshot = await fetchPage(url);
    return Response.json(snapshot);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to scrape";
    return Response.json({ error: message }, { status: 500 });
  }
}
