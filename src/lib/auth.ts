import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!token && !refreshToken) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Try access token first
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    if (data.user?.id) return data.user.id;
  }

  // Access token expired — try refresh
  if (refreshToken) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (!error && data.session) {
      // Update cookies with new tokens
      cookieStore.set("access_token", data.session.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      cookieStore.set("refresh_token", data.session.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      return data.session.user?.id || null;
    }
  }

  return null;
}
