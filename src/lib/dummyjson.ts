import { getCategoryLabel, isHouseholdCategory } from "./categories";
import type { ProductCategorySlug, StoreProduct } from "./store-types";

/** Raw shape from DummyJSON /products and /products/category/:x */
type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  images: string[];
  category: string;
};

const BASE = "https://dummyjson.com";

function badgesFrom(d: DummyJsonProduct): StoreProduct["badges"] {
  if (d.discountPercentage >= 1) {
    return [
      { type: "off", label: `${Math.round(d.discountPercentage)}% off` },
    ];
  }
  if (d.discountPercentage > 0) {
    return [{ type: "sale", label: "Sale" }];
  }
  if (d.id % 3 === 0) return [{ type: "new", label: "New" }];
  return [{ type: "sale", label: "Hot" }];
}

export function mapProduct(
  d: DummyJsonProduct,
  category: Exclude<ProductCategorySlug, "all">
): StoreProduct {
  const list = d.images.length ? d.images : [];
  const sale =
    d.discountPercentage > 0
      ? d.price * (1 - d.discountPercentage / 100)
      : undefined;
  return {
    id: d.id,
    name: d.title,
    description: d.description,
    priceUsd: d.price,
    salePriceUsd: sale,
    images: list,
    category,
    categoryLabel: getCategoryLabel(category).toUpperCase(),
    stock: d.stock,
    brand: d.brand,
    badges: badgesFrom(d),
  };
}

export async function fetchHouseholdProducts(): Promise<StoreProduct[]> {
  const categories = [
    "furniture",
    "home-decoration",
    "groceries",
    "kitchen-accessories",
  ] as const;
  const results = await Promise.all(
    categories.map(async (cat) => {
      const res = await fetch(`${BASE}/products/category/${cat}?limit=30`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return [] as StoreProduct[];
      const data = (await res.json()) as { products: DummyJsonProduct[] };
      return (data.products || []).map((p) => mapProduct(p, cat));
    })
  );
  const merged = new Map<number, StoreProduct>();
  for (const list of results) {
    for (const p of list) {
      if (!merged.has(p.id)) merged.set(p.id, p);
    }
  }
  return Array.from(merged.values());
}

export async function fetchProductById(
  id: number
): Promise<StoreProduct | null> {
  const res = await fetch(`${BASE}/products/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const d = (await res.json()) as DummyJsonProduct;
  if (!d.category) return null;
  if (!isHouseholdCategory(d.category)) return null;
  return mapProduct(d, d.category);
}

export async function fetchProductsInCategory(
  category: Exclude<ProductCategorySlug, "all">,
  limit = 100
): Promise<StoreProduct[]> {
  const res = await fetch(
    `${BASE}/products/category/${category}?limit=${limit}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as { products: DummyJsonProduct[] };
  return (data.products || []).map((p) => mapProduct(p, category));
}
