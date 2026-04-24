"use client";

import { Toaster } from "react-hot-toast";
import { CartProvider } from "./cart-context";
import { CurrencyProvider } from "./currency-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "!bg-[#1a1a1a] !text-white !border !border-zinc-700",
          }}
        />
      </CartProvider>
    </CurrencyProvider>
  );
}
