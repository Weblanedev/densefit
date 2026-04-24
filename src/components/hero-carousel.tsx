"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    title: "Furnish your home with care",
    body: "Furniture, kitchen and household products for home delivery in Nigeria.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
  },
  {
    title: "Household quality you can trust",
    body: "Storage, tableware, and daily essentials, sold at listed prices in NGN or USD.",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f9f092?w=1920&q=80",
  },
  {
    title: "Style and everyday comfort",
    body: "Décor, pantry lines, and small home upgrades, shipped to your door.",
    image:
      "https://images.unsplash.com/photo-1556228720-198ae313c0f0?w=1920&q=80",
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  return (
    <section className="relative h-[min(80vh,640px)] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={s.title}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none" }}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p
          className="mb-2 text-2xl text-[#f87171] md:text-3xl"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Shop the collection
        </p>
        <h1 className="mb-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
          {slides[i].title}
        </h1>
        <p className="mb-8 max-w-xl text-sm text-white/90 md:text-base">
          {slides[i].body}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.5 9h-11L5 9z" />
          </svg>
          Shop now
        </Link>
        <div className="mt-10 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              className={
                "h-2.5 w-2.5 rounded-full transition sm:h-3 sm:w-3 " +
                (i === idx
                  ? "scale-110 bg-[#e11b24]"
                  : "bg-white/50 hover:bg-white/70")
              }
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
