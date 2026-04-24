"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Form is rendered only after mount so password-manager extensions (e.g. Dashlane)
 * cannot inject attributes into SSR HTML and trigger hydration mismatches.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  return (
    <section
      className="relative border-y border-white/10 py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-xl px-4 text-center md:px-6">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl">
          Email me offers and restocks
        </h2>
        <p className="mt-2 text-sm text-white/80">
          We send only store news and offers, not third-party mail.
        </p>

        {mounted ? (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim() || !email.includes("@")) {
                toast.error("Please enter a valid email");
                return;
              }
              toast.success("You are signed up for emails");
              setEmail("");
            }}
          >
            <input
              type="email"
              name="newsletter-email"
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-11 flex-1 rounded-md border border-white/20 bg-white px-4 text-base text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#e11b24]"
            />
            <button
              type="submit"
              className="rounded-md bg-[#e11b24] px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Notify me
            </button>
          </form>
        ) : (
          <div
            className="mt-8 flex min-h-11 flex-col justify-center gap-3 sm:flex-row sm:items-stretch"
            aria-hidden
          >
            <div className="min-h-11 flex-1 rounded-md border border-white/20 bg-white/10" />
            <div className="mx-auto h-11 w-full max-w-[12rem] rounded-md bg-[#e11b24]/30 sm:mx-0 sm:w-32 sm:shrink-0" />
          </div>
        )}
      </div>
    </section>
  );
}
