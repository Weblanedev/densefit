"use client";

import {
  Banknote,
  Info,
  LayoutGrid,
  Mail,
  Menu,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiteCartIcon } from "@/components/icons/cart-bag-icon";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import type { DisplayCurrency } from "@/lib/currency";
import { site } from "@/lib/site";

const nav = [
  { href: "/products", label: "Shop", Icon: LayoutGrid },
  { href: "/about", label: "About", Icon: Info },
  { href: "/shipment", label: "Delivery", Icon: Truck },
  { href: "/contact", label: "Contact", Icon: Mail },
] as const;

const CUR: DisplayCurrency[] = ["NGN", "USD"];

export function Header() {
  const { itemCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-[#e11b24] transition hover:text-red-500"
        >
          <SiteCartIcon className="h-7 w-7 shrink-0" strokeWidth={2} />
          <span className="hidden min-[360px] inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((n) => {
            const Icon = n.Icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white"
              >
                <Icon className="h-4 w-4 opacity-80" strokeWidth={2} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="relative flex items-center gap-1">
            <Banknote
              className="hidden h-4 w-4 text-white/50 sm:block"
              strokeWidth={2}
              aria-hidden
            />
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as DisplayCurrency)}
              className="cursor-pointer rounded-md border border-white/20 bg-[#1a1a1a] py-1.5 pl-2 pr-7 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e11b24]"
            >
              {CUR.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-white/50"
              aria-hidden
            >
              ▼
            </span>
          </div>

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Shopping cart"
          >
            <SiteCartIcon className="h-6 w-6" strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e11b24] px-1 text-xs font-semibold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#1a1a1a] px-4 py-3 md:hidden">
          {nav.map((n) => {
            const Icon = n.Icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 py-2.5 text-white"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {n.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
