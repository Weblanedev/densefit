"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { DisplayCurrency } from "@/lib/currency";

const STORAGE = "densefit-currency";
const CURRENCIES: DisplayCurrency[] = ["NGN", "USD"];

const CurrencyContext = createContext<{
  currency: DisplayCurrency;
  setCurrency: (c: DisplayCurrency) => void;
} | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<DisplayCurrency>("NGN");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const v = localStorage.getItem(STORAGE) as DisplayCurrency | null;
        if (v && (CURRENCIES as string[]).includes(v)) {
          setCurrencyState(v);
        }
      } catch {
        /* ignore */
      }
    });
  }, []);

  const setCurrency = useCallback((c: DisplayCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE, c);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const c = useContext(CurrencyContext);
  if (!c) throw new Error("useCurrency must be used under CurrencyProvider");
  return c;
}
