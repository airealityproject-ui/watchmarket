import { getSupabase } from "@/lib/supabase";
import { AddCompetitorForm } from "./add-competitor-form";

async function getCompetitorsWithSnapshots() {
  const { data: competitors } = await getSupabase()
    .from("competitors")
    .select("*")
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

      return { ...c, latestSnapshot: snapshots?.[0] || null };
    })
  );

  return result;
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const competitors = await getCompetitorsWithSnapshots();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <a
            href="/"
            className="text-sm text-slate-500 hover:text-slate-400"
          >
            ← Back to home
          </a>
        </div>

        <AddCompetitorForm />

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            Competitors ({competitors.length})
          </h2>

          {competitors.length === 0 ? (
            <p className="text-slate-500">
              No competitors added yet. Add one above.
            </p>
          ) : (
            <div className="space-y-4">
              {competitors.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-lg bg-slate-900 border border-slate-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{c.name}</h3>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        {c.url}
                      </a>
                    </div>
                    {c.latestSnapshot && (
                      <span className="text-xs text-slate-500">
                        Last scan:{" "}
                        {new Date(
                          c.latestSnapshot.scraped_at
                        ).toLocaleDateString()}
                      </span>
                    )}
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
