/**
 * Card payment integration (not wired to checkout UI yet).
 * Do not call real APIs until keys are set in the server environment.
 *
 * @see https://korapay.com - align types with official docs when implementing.
 */
export type KorapayInit = {
  orderId: string;
  amount: number;
  currency: "NGN" | "USD";
  customer: { email: string; name?: string };
  callbackUrl: string;
};

export async function initPayment(
  _p: KorapayInit
): Promise<{ redirectUrl: string }> {
  void _p;
  throw new Error("Card gateway is not enabled on this build.");
}

export async function verifyWebhook(): Promise<never> {
  throw new Error("Card gateway webhooks are not configured.");
}

/**
 * Reserved env: KORAPAY_SECRET_KEY, KORAPAY_PUBLIC_KEY, PAYMENT_CALLBACK_URL
 */
