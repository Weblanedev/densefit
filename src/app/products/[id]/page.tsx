import { ProductDetailClient } from "@/app/products/[id]/product-detail-client";
import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/page-header";
import { fetchProductById, fetchProductsInCategory } from "@/lib/dummyjson";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const n = Number(id);
  if (Number.isNaN(n)) notFound();
  const product = await fetchProductById(n);
  if (!product) notFound();
  const related = (await fetchProductsInCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <PageHeader
        title={product.name}
        breadcrumb={[
          { href: "/products", label: "Shop" },
          { label: "Details" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <ProductDetailClient product={product} />
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-white">You may also like</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export const revalidate = 3600;
