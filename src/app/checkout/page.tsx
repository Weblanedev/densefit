"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/page-header";
import { ProcessingOverlay } from "@/components/processing-overlay";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { formatMoney } from "@/lib/currency";
import { SHIPPING_USD } from "@/lib/shipping";

export default function CheckoutPage() {
  const { lines, itemCount } = useCart();
  const { currency } = useCurrency();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  const subtotalUsd = lines.reduce(
    (s, l) => s + l.unitPriceUsd * l.quantity,
    0
  );
  const totalUsd = subtotalUsd + (lines.length ? SHIPPING_USD : 0);

  const pay = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      router.push("/payment/failed");
    }, 1800);
  };

  if (itemCount === 0) {
    return (
      <div>
        <PageHeader
          title="Checkout"
          description="Your cart is empty"
          breadcrumb={[{ href: "/cart", label: "Cart" }, { label: "Checkout" }]}
        />
        <div className="mx-auto max-w-lg px-4 py-10 text-center">
          <p className="text-white/70">Add something to your cart to continue.</p>
          <Link
            className="mt-4 inline-block text-[#e11b24] underline"
            href="/products"
          >
            Shop products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProcessingOverlay
        open={busy}
        title="Processing payment"
        subtitle="Please wait. Keep this page open for a few seconds."
      />
      <PageHeader
        title="Checkout"
        description="Enter your delivery address. We ship in Nigeria. Payment is taken when you complete your order below."
        breadcrumb={[{ href: "/cart", label: "Cart" }, { label: "Checkout" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-2 md:px-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            pay();
          }}
        >
          <h2 className="text-lg font-semibold text-white">Delivery details</h2>
          {(
            [
              ["name", "Full name", "text"],
              ["email", "Email", "email"],
              ["phone", "Phone", "tel"],
              ["state", "State", "text"],
              ["city", "City", "text"],
              ["address", "Full address", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <div key={key}>
              <label className="mb-1 block text-sm text-white/80" htmlFor={key}>
                {label}
                <span className="text-red-400"> *</span>
              </label>
              <input
                id={key}
                name={key}
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full min-h-11 rounded-md border border-white/20 bg-zinc-900 px-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#e11b24]"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-[#e11b24] py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Complete order (pay)"}
          </button>
        </form>

        <div className="h-fit rounded-xl border border-white/10 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Order summary</h2>
          <ul className="space-y-2 text-sm text-white/90">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-2">
                <span>
                  {l.name} × {l.quantity}
                </span>
                <span>
                  {formatMoney(l.unitPriceUsd * l.quantity, currency)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-white/80">
              <span>Subtotal</span>
              <span>{formatMoney(subtotalUsd, currency)}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Shipping</span>
              <span>{formatMoney(SHIPPING_USD, currency)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>{formatMoney(totalUsd, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
