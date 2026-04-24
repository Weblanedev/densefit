import {
  Clock,
  CreditCard,
  Leaf,
  Shield,
  Tag,
  ThumbsUp,
  Truck,
} from "lucide-react";

function SecuredPaymentIcon() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <CreditCard
        className="relative z-0 h-9 w-9 text-amber-500"
        strokeWidth={1.6}
        aria-hidden
      />
      <div className="absolute -right-0.5 bottom-0 z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-white shadow-sm ring-1 ring-zinc-200">
        <Shield className="h-4 w-4 text-emerald-600" strokeWidth={2} aria-hidden />
      </div>
    </div>
  );
}

function EcoIcon() {
  return (
    <div className="relative flex h-12 w-12 flex-col items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400/80 bg-amber-100/50 shadow-inner">
        <ThumbsUp
          className="h-5 w-5 text-emerald-600"
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <div className="mt-0.5 h-1.5 w-4 rounded-b-sm bg-rose-500/80" aria-hidden />
      <Leaf
        className="absolute -right-1 -top-0.5 h-3.5 w-3.5 text-emerald-500"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}

function ShippingIcon() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <Truck className="h-9 w-9 text-red-500" strokeWidth={1.6} aria-hidden />
      <div className="absolute -left-0.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow">
        <Clock className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
      </div>
    </div>
  );
}

function DiscountIcon() {
  return (
    <div className="flex items-end justify-center gap-0.5">
      <div className="flex flex-col items-center">
        <Tag
          className="h-8 w-8 -rotate-6 text-amber-400"
          strokeWidth={1.6}
          aria-hidden
        />
        <span
          className="-mt-3 text-[10px] font-bold text-zinc-800"
          aria-hidden
        >
          $
        </span>
      </div>
      <ThumbsUp
        className="h-5 w-5 text-sky-500"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}

const features = [
  { label: "Secured Payment", Icon: SecuredPaymentIcon },
  { label: "Eco-Friendly", Icon: EcoIcon },
  { label: "Fast shipping", Icon: ShippingIcon },
  { label: "Discount System", Icon: DiscountIcon },
] as const;

/** Photo-only (no UI); if the PNG in /public is a design export it can “ghost” the whole section. */
const BARRELS_PHOTO =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format";

export function TrustSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-zinc-950"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.78)), url(${BARRELS_PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
          Why Trust Us?
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((f) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.label}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-300/30">
                  <Icon />
                </div>
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {f.label}
                </h3>
                <div
                  className="mt-2 h-px w-10 border-0 border-b border-dashed border-white/70"
                  aria-hidden
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
