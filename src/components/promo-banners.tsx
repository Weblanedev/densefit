import Image from "next/image";
import Link from "next/link";

const promos = [
  {
    title: "10% off",
    subtitle: "Home décor essentials this week",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    href: "/products?category=home-decoration",
  },
  {
    title: "15% off",
    subtitle: "Furniture and storage picks",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    href: "/products?category=furniture",
  },
] as const;

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {promos.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group relative h-56 overflow-hidden rounded-2xl md:h-64"
          >
            <Image
              src={p.image}
              alt=""
              fill
              className="object-cover transition group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/20" />
            <div className="relative z-10 flex h-full flex-col justify-center p-6 md:p-8">
              <p className="text-3xl font-bold text-white md:text-4xl">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-white/90">{p.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
