"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { formatMoney } from "@/lib/currency";
import type { StoreProduct } from "@/lib/store-types";

function unit(p: StoreProduct) {
  return p.salePriceUsd ?? p.priceUsd;
}
function list(p: StoreProduct) {
  return p.salePriceUsd != null ? p.priceUsd : null;
}

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const { add } = useCart();
  const { currency } = useCurrency();
  const img = product.images[0];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square rounded-xl bg-zinc-900/50 p-4">
        {img && (
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        {product.badges[0] && (
          <span className="absolute left-4 top-4 rounded bg-[#e11b24] px-2 py-1 text-xs font-semibold text-white">
            {product.badges[0].label}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-[#e11b24]">
          {product.categoryLabel}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">
          {product.name}
        </h1>
        {product.brand && (
          <p className="mt-1 text-sm text-white/60">Brand: {product.brand}</p>
        )}
        <div className="mt-4 text-2xl font-semibold text-white">
          {formatMoney(unit(product), currency)}
          {list(product) != null && (
            <span className="ml-2 text-lg font-normal text-white/50 line-through">
              {formatMoney(list(product)!, currency)}
            </span>
          )}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/80">
          {product.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              add(product);
              toast.success("Added to cart");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-white px-6 py-3 text-sm font-semibold text-zinc-900"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
