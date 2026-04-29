import { lemonSqueezySetup, createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";

let _initialized = false;

function init() {
  if (_initialized) return;
  const key = process.env.LEMONSQUEEZY_API_KEY;
  if (!key) throw new Error("Missing LEMONSQUEEZY_API_KEY");
  lemonSqueezySetup({ apiKey: key });
  _initialized = true;
}

export async function createCheckoutUrl(
  variantId: string,
  userId: string,
  email: string
): Promise<string> {
  init();

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId) throw new Error("Missing LEMONSQUEEZY_STORE_ID");

  const { data, error } = await createCheckout(storeId, variantId, {
    checkoutData: {
      email,
      custom: { user_id: userId },
    },
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://watchmarket.dev"}/dashboard`,
    },
  });

  if (error) throw new Error(String(error));
  return data!.data.attributes.url;
}

export async function getSubscriptionStatus(subscriptionId: string) {
  init();
  const { data, error } = await getSubscription(subscriptionId);
  if (error) throw new Error(String(error));
  return data!.data.attributes.status;
}
