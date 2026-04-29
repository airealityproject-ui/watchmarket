import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { scrapeAndStore, getLatestSnapshots } from "@/lib/scraper/store";
import { diffSnapshots } from "@/lib/scraper/diff";
import { generateDigest } from "@/lib/ai/digest";
import { sendDigestEmail } from "@/lib/email/send-digest";
import { PageSnapshot } from "@/lib/scraper/fetch-page";

interface DigestInput {
  competitorName: string;
  url: string;
  diff: ReturnType<typeof diffSnapshots>;
  currentTitle: string;
  currentDescription: string;
  currentHeadings: string[];
}

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

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: competitors } = await getSupabase()
    .from("competitors")
    .select("*");

  if (!competitors || competitors.length === 0) {
    return Response.json({ message: "No competitors" });
  }

  // Group competitors by user_id
  const byUser = new Map<string, typeof competitors>();
  for (const c of competitors) {
    const userId = c.user_id;
    if (!userId) continue;
    if (!byUser.has(userId)) byUser.set(userId, []);
    byUser.get(userId)!.push(c);
  }

  const results = [];
  const emailsSent: string[] = [];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Process each user's competitors
  for (const [userId, userCompetitors] of byUser) {
    const digestInputs: DigestInput[] = [];

    for (const c of userCompetitors) {
      try {
        const oldSnapshots = await getLatestSnapshots(c.id, 1);
        await scrapeAndStore(c.id, c.url);
        const newSnapshots = await getLatestSnapshots(c.id, 1);

        if (oldSnapshots.length > 0 && newSnapshots.length > 0) {
          const oldSnap = toPageSnapshot(oldSnapshots[0], c.url);
          const newSnap = toPageSnapshot(newSnapshots[0], c.url);
          const diff = diffSnapshots(oldSnap, newSnap);

          results.push({ competitor: c.name, significantChange: diff.significantChange });
          digestInputs.push({
            competitorName: c.name,
            url: c.url,
            diff,
            currentTitle: newSnap.title,
            currentDescription: newSnap.description,
            currentHeadings: newSnap.headings,
          });
        } else {
          results.push({ competitor: c.name, note: "First scan" });
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed";
        results.push({ competitor: c.name, error: message });
      }
    }

    if (digestInputs.length === 0) continue;

    const hasChanges = digestInputs.some((i) => i.diff.significantChange);

    try {
      const digest = await generateDigest(digestInputs);

      // Save to DB
      await getSupabase().from("digests").insert({
        user_id: userId,
        content: digest,
        has_changes: hasChanges,
      });

      // Send email if there are significant changes
      if (hasChanges) {
        const { data: { user } } = await getSupabase().auth.admin.getUserById(userId);
        if (user?.email) {
          await sendDigestEmail(user.email, digest, today);
          emailsSent.push(user.email);
        }
      }
    } catch {
      // digest generation/email failed, continue with other users
    }
  }

  return Response.json({
    scanned: results.length,
    emailsSent: emailsSent.length,
    results,
  });
}
