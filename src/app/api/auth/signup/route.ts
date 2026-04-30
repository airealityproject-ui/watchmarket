import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { email, password, utm } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "Email and password required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://watchmarket.dev/auth/callback",
      ...(utm?.source ? { data: { utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign } } : {}),
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
