import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/page-header";
import {
  HOUSEHOLD_API_CATEGORIES,
} from "@/lib/categories";
import { getCategoryLabel } from "@/lib/categories";
import { fetchHouseholdProducts, fetchProductsInCategory } from "@/lib/dummyjson";
import type { ProductCategorySlug } from "@/lib/store-types";
import Link from "next/link";

type Search = { q?: string; category?: string };

function parseCategory(
  c: string | undefined
): ProductCategorySlug {
  if (!c) return "all";
  if (c === "all") return "all";
  if (
    (HOUSEHOLD_API_CATEGORIES as string[]).includes(c)
  ) {
    return c as ProductCategorySlug;
  }
  return "all";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { q, category: catRaw } = await searchParams;
  const category = parseCategory(catRaw);

  let products =
    category === "all"
      ? await fetchHouseholdProducts()
      : await fetchProductsInCategory(
          category as Exclude<ProductCategorySlug, "all">
        );

  const query = (q || "").trim().toLowerCase();
  if (query) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return (
    <div>
      <PageHeader
        title="Household products"
        description="Furniture, home décor, groceries, and kitchen essentials. Prices shown in the currency you select in the header."
        breadcrumb={[{ label: "Shop" }]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <FilterChip href="/products" label="All" active={category === "all"} />
          {HOUSEHOLD_API_CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              href={`/products?category=${c}`}
              label={getCategoryLabel(c)}
              active={category === c}
            />
          ))}
        </div>
        {products.length === 0 ? (
          <p className="text-center text-white/70">
            No products found.{" "}
            <Link className="text-[#e11b24] underline" href="/products">
              Clear filters
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full border px-3 py-1.5 text-sm font-medium transition " +
        (active
          ? "border-[#e11b24] bg-[#e11b24]/20 text-white"
          : "border-white/20 text-white/80 hover:border-white/40")
      }
    >
      {label}
    </Link>
  );
}

export const revalidate = 3600;
