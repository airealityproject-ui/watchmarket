import * as cheerio from "cheerio";

export interface PageSnapshot {
  url: string;
  title: string;
  description: string;
  headings: string[];
  bodyText: string;
  links: { text: string; href: string }[];
  scrapedAt: string;
}

export async function fetchPage(url: string): Promise<PageSnapshot> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // Remove script, style, nav, footer to get clean text
  $("script, style, nav, footer, header, noscript, svg").remove();

  const title = $("title").text().trim();
  const description =
    $('meta[name="description"]').attr("content")?.trim() || "";

  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000);

  const links: { text: string; href: string }[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().trim();
    if (text && href.startsWith("http")) {
      links.push({ text: text.slice(0, 100), href });
    }
  });

  return {
    url,
    title,
    description,
    headings: headings.slice(0, 20),
    bodyText,
    links: links.slice(0, 50),
    scrapedAt: new Date().toISOString(),
  };
}
