import { getSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CompetitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const competitorId = parseInt(id);

  const { data: competitor } = await getSupabase()
    .from("competitors")
    .select("*")
    .eq("id", competitorId)
    .single();

  if (!competitor) return notFound();

  const { data: snapshots } = await getSupabase()
    .from("snapshots")
    .select("*")
    .eq("competitor_id", competitorId)
    .order("scraped_at", { ascending: false })
    .limit(20);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{competitor.name}</h1>
            <a
              href={competitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              {competitor.url}
            </a>
          </div>
          <a
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-slate-400"
          >
            ← Back to dashboard
          </a>
        </div>

        <h2 className="text-lg font-semibold mb-4">
          Scan History ({snapshots?.length || 0})
        </h2>

        <div className="space-y-4">
          {snapshots?.map((snap, index) => {
            const prev = snapshots[index + 1];
            const titleChanged = prev && prev.title !== snap.title;
            const descChanged = prev && prev.description !== snap.description;
            const hasChanges = titleChanged || descChanged;

            return (
              <div
                key={snap.id}
                className={`p-5 rounded-lg border ${
                  hasChanges
                    ? "bg-yellow-500/5 border-yellow-500/20"
                    : "bg-slate-900 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">
                    {new Date(snap.scraped_at).toLocaleString()}
                  </span>
                  {hasChanges && (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">
                      Changes detected
                    </span>
                  )}
                  {index === 0 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                      Latest
                    </span>
                  )}
                </div>

                <p className="text-sm mb-1">
                  <span className="text-slate-500">Title:</span> {snap.title}
                </p>

                {titleChanged && (
                  <p className="text-xs text-yellow-400 mb-1">
                    Was: &quot;{prev.title}&quot;
                  </p>
                )}

                {snap.description && (
                  <p className="text-sm text-slate-400 mb-1">
                    <span className="text-slate-500">Description:</span>{" "}
                    {snap.description.slice(0, 200)}
                    {snap.description.length > 200 && "..."}
                  </p>
                )}

                {descChanged && (
                  <p className="text-xs text-yellow-400 mb-1">
                    Was: &quot;{prev.description?.slice(0, 100)}...&quot;
                  </p>
                )}

                {snap.headings?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {snap.headings
                      .slice(0, 8)
                      .map((h: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400"
                        >
                          {h}
                        </span>
                      ))}
                    {snap.headings.length > 8 && (
                      <span className="text-xs text-slate-500">
                        +{snap.headings.length - 8} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
