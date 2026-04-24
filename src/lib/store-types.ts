export type ProductCategorySlug =
  | "all"
  | "furniture"
  | "home-decoration"
  | "groceries"
  | "kitchen-accessories";

export type ProductBadge = "new" | "sale" | "off";

export type StoreProduct = {
  id: number;
  name: string;
  description: string;
  /** List price in USD (from catalog feed; NGN uses the site exchange rate). */
  priceUsd: number;
  /** Optional discount: sale price in USD. */
  salePriceUsd?: number;
  images: string[];
  category: Exclude<ProductCategorySlug, "all">;
  categoryLabel: string;
  stock: number;
  brand?: string;
  badges: { type: ProductBadge; label?: string }[];
};

export type CartLine = {
  id: number;
  name: string;
  image: string;
  priceUsd: number;
  /** Snapshot sale unit price in USD if applicable */
  unitPriceUsd: number;
  quantity: number;
  categoryLabel: string;
};
