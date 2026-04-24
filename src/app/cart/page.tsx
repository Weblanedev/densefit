"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { formatMoney } from "@/lib/currency";
import { SHIPPING_USD } from "@/lib/shipping";
import { PageHeader } from "@/components/page-header";

export default function CartPage() {
  const { lines, setQty, remove, itemCount } = useCart();
  const { currency } = useCurrency();

  const subtotalUsd = lines.reduce(
    (s, l) => s + l.unitPriceUsd * l.quantity,
    0
  );
  const totalUsd = subtotalUsd + (lines.length ? SHIPPING_USD : 0);

  return (
    <div>
      <PageHeader
        title="Your cart"
        description={
          itemCount
            ? `${itemCount} item(s) in your bag`
            : "Your bag is empty"
        }
        breadcrumb={[{ label: "Cart" }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        {lines.length === 0 ? (
          <p className="text-center text-white/70">
            <Link className="text-[#e11b24] underline" href="/products">
              Continue shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-6">
            {lines.map((l) => (
              <div
                key={l.id}
                className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-zinc-800">
                  {l.image ? (
                    <Image
                      src={l.image}
                      alt={l.name}
                      fill
                      className="object-contain p-1"
                      sizes="96px"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center p-1 text-center text-xs text-white/50"
                      aria-hidden
                    >
                      Photo
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase text-[#e11b24]">
                    {l.categoryLabel}
                  </p>
                  <Link
                    href={`/products/${l.id}`}
                    className="font-medium text-white hover:underline"
                  >
                    {l.name}
                  </Link>
                  <p className="text-sm text-white/70">
                    {formatMoney(l.unitPriceUsd, currency)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`qty-${l.id}`}>
                    Quantity
                  </label>
                  <input
                    id={`qty-${l.id}`}
                    type="number"
                    min={1}
                    value={l.quantity}
                    onChange={(e) =>
                      setQty(l.id, Number(e.target.value) || 1)
                    }
                    className="w-16 rounded border border-white/20 bg-zinc-900 px-2 py-1 text-center text-base text-white"
                  />
                  <button
                    type="button"
                    onClick={() => remove(l.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                <p className="w-full text-right text-sm font-semibold text-white sm:w-auto sm:min-w-[6rem]">
                  {formatMoney(l.unitPriceUsd * l.quantity, currency)}
                </p>
              </div>
            ))}

            <div className="space-y-2 text-right text-sm text-white/90">
              <p>
                Subtotal: {formatMoney(subtotalUsd, currency)}
              </p>
              {lines.length > 0 && (
                <p>Shipping: {formatMoney(SHIPPING_USD, currency)}</p>
              )}
              <p className="text-lg font-bold text-white">
                Total: {formatMoney(totalUsd, currency)}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="/products"
                className="rounded-md border border-white/30 px-4 py-2.5 text-sm text-white/90"
              >
                Keep shopping
              </Link>
              <Link
                href="/checkout"
                className="rounded-md bg-[#e11b24] px-6 py-2.5 text-sm font-semibold text-white"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
