const items = [
  { title: "Secure payment", desc: "Pay at checkout" },
  { title: "Household focus", desc: "Furniture and home goods" },
  { title: "Delivery", desc: "To the address you give us" },
  { title: "Clear prices", desc: "NGN or USD in the header" },
] as const;

export function TrustSection() {
  return (
    <section
      className="relative border-y border-white/10 py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.9)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
          Why trust us?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <div
              key={t.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white/90">
                ✓
              </div>
              <h3 className="font-semibold text-white">{t.title}</h3>
              <div className="mb-1 mt-2 h-px w-12 border-b border-dashed border-white/30" />
              <p className="text-sm text-white/70">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
