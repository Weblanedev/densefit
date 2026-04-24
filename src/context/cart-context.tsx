"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/lib/store-types";
import type { StoreProduct } from "@/lib/store-types";

const KEY = "densefit-cart";

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const r = localStorage.getItem(KEY);
    if (!r) return [];
    const p = JSON.parse(r) as CartLine[];
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function getUnitFromProduct(p: StoreProduct) {
  const u = p.salePriceUsd ?? p.priceUsd;
  return { unitPriceUsd: u, listUsd: p.priceUsd };
}

const CartContext = createContext<{
  lines: CartLine[];
  itemCount: number;
  add: (p: StoreProduct) => void;
  remove: (id: number) => void;
  setQty: (id: number, q: number) => void;
  clear: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setLines(load());
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const add = useCallback((p: StoreProduct) => {
    const { unitPriceUsd } = getUnitFromProduct(p);
    const img = p.images[0] ?? "";
    setLines((prev) => {
      const ex = prev.find((l) => l.id === p.id);
      if (ex) {
        return prev.map((l) =>
          l.id === p.id
            ? { ...l, quantity: l.quantity + 1, unitPriceUsd, priceUsd: l.priceUsd }
            : l
        );
      }
      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          image: img,
          priceUsd: p.priceUsd,
          unitPriceUsd,
          quantity: 1,
          categoryLabel: p.categoryLabel,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: number, q: number) => {
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity: q } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, itemCount, add, remove, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used under CartProvider");
  return c;
}
