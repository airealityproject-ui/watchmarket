import { getSupabase } from "@/lib/supabase";
import { getCurrentUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DigestsPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const { data: digests } = await getSupabase()
    .from("digests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Digest History</h1>
          <a
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-slate-400"
          >
            ← Back to dashboard
          </a>
        </div>

        {!digests || digests.length === 0 ? (
          <p className="text-slate-500">
            No digests yet. Run a rescan to generate one.
          </p>
        ) : (
          <div className="space-y-4">
            {digests.map((d) => (
              <div
                key={d.id}
                className={`p-5 rounded-lg border ${
                  d.has_changes
                    ? "bg-yellow-500/5 border-yellow-500/20"
                    : "bg-slate-900 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">
                    {new Date(d.created_at).toLocaleString()}
                  </span>
                  {d.has_changes && (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">
                      Changes detected
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-300 whitespace-pre-wrap">
                  {d.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
