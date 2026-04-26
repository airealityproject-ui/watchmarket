import crypto from "crypto";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 401 });
  }

  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  if (digest !== signature) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta.event_name;
  const userId = event.meta.custom_data?.user_id;

  if (!userId) {
    return Response.json({ ok: true, skipped: "no user_id" });
  }

  if (eventName === "subscription_created" || eventName === "subscription_updated") {
    const status = event.data.attributes.status;
    const subscriptionId = String(event.data.id);
    const planName = event.data.attributes.variant_name || "pro";

    await getSupabase().from("subscriptions").upsert(
      {
        user_id: userId,
        subscription_id: subscriptionId,
        status,
        plan: planName,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  }

  return Response.json({ ok: true });
}
