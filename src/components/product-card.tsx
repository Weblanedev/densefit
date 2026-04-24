"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { formatMoney } from "@/lib/currency";
import type { StoreProduct } from "@/lib/store-types";

function linePrice(p: StoreProduct) {
  return p.salePriceUsd ?? p.priceUsd;
}

function unitUsd(p: StoreProduct) {
  return linePrice(p);
}

function listUsd(p: StoreProduct) {
  return p.salePriceUsd != null ? p.priceUsd : null;
}

export function ProductCard({ product }: { product: StoreProduct }) {
  const { add } = useCart();
  const { currency } = useCurrency();
  const img = product.images[0] ?? null;
  const list = listUsd(product);

  return (
    <article className="group flex flex-col items-center text-center">
      <div className="relative mb-3 w-full overflow-hidden rounded-lg bg-zinc-900/50">
        {product.badges[0] && (
          <span className="absolute left-2 top-2 z-10 rounded bg-[#e11b24] px-2 py-0.5 text-xs font-semibold text-white">
            {product.badges[0].label}
          </span>
        )}
        <Link href={`/products/${product.id}`} className="block aspect-[4/3] w-full">
          {img && (
            <Image
              src={img}
              alt={product.name}
              width={400}
              height={300}
              className="h-full w-full object-contain p-2 transition group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => {
          add(product);
          toast.success("Added to cart");
        }}
        className="mb-2 inline-flex w-full max-w-[200px] items-center justify-center gap-2 rounded-md border border-zinc-800 bg-white py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.5 9h-11L5 9z" />
        </svg>
        Add to cart
      </button>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#e11b24]">
        {product.categoryLabel}
      </p>
      <Link href={`/products/${product.id}`}>
        <h3 className="line-clamp-2 text-sm font-medium text-white group-hover:underline">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1 text-base font-semibold text-white">
        {formatMoney(unitUsd(product), currency)}
        {list != null && (
          <span className="ml-2 text-sm font-normal text-white/50 line-through">
            {formatMoney(list, currency)}
          </span>
        )}
      </div>
    </article>
  );
}
