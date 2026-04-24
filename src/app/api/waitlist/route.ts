import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return Response.json({ error: "Already on the waitlist" }, { status: 409 });
    }
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

export async function GET() {
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return Response.json({ count: count ?? 0 });
}
