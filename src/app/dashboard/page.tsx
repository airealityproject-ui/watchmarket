import { getSupabase } from "@/lib/supabase";
import { getCurrentUserId } from "@/lib/auth";
import { AddCompetitorForm } from "./add-competitor-form";
import { RescanButton } from "./rescan-button";
import { DeleteButton } from "./delete-button";
import { RescanOneButton } from "./rescan-one-button";
import { LogoutButton } from "./logout-button";

async function getCompetitorsWithSnapshots(userId: string) {
  const { data: competitors } = await getSupabase()
    .from("competitors")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!competitors) return [];

  const result = await Promise.all(
    competitors.map(async (c) => {
      const { data: snapshots } = await getSupabase()
        .from("snapshots")
        .select("title, description, headings, scraped_at")
        .eq("competitor_id", c.id)
        .order("scraped_at", { ascending: false })
        .limit(1);

      const { count } = await getSupabase()
        .from("snapshots")
        .select("*", { count: "exact", head: true })
        .eq("competitor_id", c.id);

      return {
        ...c,
        latestSnapshot: snapshots?.[0] || null,
        snapshotCount: count ?? 0,
      };
    })
  );

  return result;
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  const competitors = await getCompetitorsWithSnapshots(userId);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard/digests"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Digest History
            </a>
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-slate-400"
            >
              ← Home
            </a>
            <LogoutButton />
          </div>
        </div>

        <AddCompetitorForm />

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Competitors ({competitors.length}/3)
            </h2>
            <div className="flex items-center gap-3">
              {competitors.length >= 3 && (
                <a
                  href="/pricing"
                  className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  Upgrade for more
                </a>
              )}
              {competitors.length > 0 && <RescanButton />}
            </div>
          </div>

          {competitors.length === 0 ? (
            <div className="p-8 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <h3 className="font-semibold mb-2">Welcome! Let&apos;s track your first competitor.</h3>
              <p className="text-sm text-slate-400 mb-4">
                Paste a competitor&apos;s URL above (e.g. their pricing page) and click &quot;Add competitor&quot;.
                We&apos;ll scan it immediately and start monitoring daily.
              </p>
              <p className="text-xs text-slate-600">Free plan: up to 3 competitors with daily AI digests.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {competitors.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-lg bg-slate-900 border border-slate-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <a href={`/dashboard/competitor/${c.id}`} className="font-semibold hover:text-blue-400 transition-colors block">{c.name}</a>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        {c.url}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.latestSnapshot && (
                        <span className="text-xs text-slate-500">
                          {c.snapshotCount} scans · Last:{" "}
                          {new Date(
                            c.latestSnapshot.scraped_at
                          ).toLocaleDateString()}
                        </span>
                      )}
                      <RescanOneButton competitorId={c.id} />
                      <DeleteButton id={c.id} />
                    </div>
                  </div>

                  {c.latestSnapshot && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <p className="text-sm text-slate-400 mb-1">
                        <span className="text-slate-500">Title:</span>{" "}
                        {c.latestSnapshot.title}
                      </p>
                      {c.latestSnapshot.description && (
                        <p className="text-sm text-slate-400 mb-1">
                          <span className="text-slate-500">Description:</span>{" "}
                          {c.latestSnapshot.description.slice(0, 150)}
                          {c.latestSnapshot.description.length > 150 && "..."}
                        </p>
                      )}
                      {c.latestSnapshot.headings?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {c.latestSnapshot.headings
                            .slice(0, 5)
                            .map((h: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400"
                              >
                                {h}
                              </span>
                            ))}
                          {c.latestSnapshot.headings.length > 5 && (
                            <span className="px-2 py-0.5 text-xs text-slate-500">
                              +{c.latestSnapshot.headings.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
