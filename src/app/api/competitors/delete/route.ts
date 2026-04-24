import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id;

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  await getSupabase().from("snapshots").delete().eq("competitor_id", id);
  const { error } = await getSupabase().from("competitors").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
