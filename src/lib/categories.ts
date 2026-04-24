import type { ProductCategorySlug } from "./store-types";

export const HOUSEHOLD_API_CATEGORIES: Exclude<ProductCategorySlug, "all">[] = [
  "furniture",
  "home-decoration",
  "groceries",
  "kitchen-accessories",
];

const LABELS: Record<Exclude<ProductCategorySlug, "all">, string> = {
  furniture: "Furniture",
  "home-decoration": "Home décor",
  groceries: "Groceries",
  "kitchen-accessories": "Kitchen",
};

export function getCategoryLabel(slug: ProductCategorySlug): string {
  if (slug === "all") return "Household";
  return LABELS[slug];
}

export function isHouseholdCategory(
  s: string
): s is Exclude<ProductCategorySlug, "all"> {
  return (HOUSEHOLD_API_CATEGORIES as string[]).includes(s);
}
