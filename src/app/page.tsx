import { HeroCarousel } from "@/components/hero-carousel";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { PromoBanners } from "@/components/promo-banners";
import { TrustSection } from "@/components/trust-section";
import { fetchHouseholdProducts } from "@/lib/dummyjson";
import Link from "next/link";

export default async function HomePage() {
  const all = await fetchHouseholdProducts();
  const best = all.slice(0, 8);
  const more = all.slice(8, 12);

  return (
    <>
      <HeroCarousel />
      <TrustSection />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <p
          className="mb-1 text-center text-2xl text-[#e11b24]"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Shop now
        </p>
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          Best selling
        </h2>
        <div className="mx-auto mb-10 h-px w-20 border-b-2 border-dashed border-white/30" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/products"
            className="inline-block text-sm font-medium text-[#e11b24] hover:underline"
          >
            View all products
          </Link>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-[#0a0a0a] py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              More for your home
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PromoBanners />
      <Newsletter />
    </>
  );
}

export const revalidate = 3600;
