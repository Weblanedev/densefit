import Link from "next/link";

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb: { href?: string; label: string }[];
}) {
  return (
    <div className="border-b border-white/10 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <nav className="mb-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {breadcrumb.map((b) => (
            <span key={b.label + (b.href || "")}>
              {" "}
              &gt;{" "}
              {b.href ? (
                <Link href={b.href} className="hover:text-white">
                  {b.label}
                </Link>
              ) : (
                <span className="text-white">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-white/70">{description}</p>
        )}
      </div>
    </div>
  );
}

export function PageHero({
  title,
  breadcrumb,
  image,
}: {
  title: string;
  breadcrumb: { label: string; href?: string }[];
  image: string;
}) {
  return (
    <div className="relative h-48 w-full overflow-hidden md:h-56">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${image})`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-white/80">
          {breadcrumb.map((b, i) => (
            <span key={b.label + i}>
              {i > 0 && " > "}
              {b.href && i < breadcrumb.length - 1 ? (
                <Link href={b.href} className="hover:underline">
                  {b.label}
                </Link>
              ) : (
                <span>{b.label}</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
