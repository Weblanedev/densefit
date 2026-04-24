/**
 * Display currencies supported in the store (header selector).
 * List prices in the feed are stored as USD; NGN = USD × rate.
 */
export type DisplayCurrency = "USD" | "NGN";

const DEFAULT_NGN_PER_USD = 1600;

export function getNgnPerUsd(): number {
  const v = process.env.NEXT_PUBLIC_NGN_PER_USD;
  if (v) {
    const n = Number(v);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return DEFAULT_NGN_PER_USD;
}

/** Unit price in USD → display string for current currency. */
export function formatMoney(unitUsd: number, currency: DisplayCurrency): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(unitUsd);
  }
  const ngn = unitUsd * getNgnPerUsd();
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(ngn);
}

export function toDisplayUnit(
  usd: number,
  currency: DisplayCurrency
): number {
  if (currency === "USD") return usd;
  return usd * getNgnPerUsd();
}
