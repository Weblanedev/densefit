import { XCircle } from "lucide-react";
import Link from "next/link";
import { contact } from "@/lib/contact";

export const metadata = {
  title: "Payment unsuccessful",
};

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-[calc(100dvh-10rem)] flex-col bg-gradient-to-b from-red-950/25 via-black to-black">
      <div className="shrink-0 border-b border-red-900/40 bg-red-950/10">
        <div className="mx-auto max-w-6xl px-4 py-3 text-base text-white/50">
          <Link href="/" className="transition hover:text-white/80">
            Home
          </Link>
          <span className="mx-1.5 text-white/35">/</span>
          <Link href="/checkout" className="transition hover:text-white/80">
            Checkout
          </Link>
          <span className="mx-1.5 text-white/35">/</span>
          <span className="text-red-400/90">Payment failed</span>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 text-center">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
          <div
            className="mb-8 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-950/70 ring-2 ring-red-500/40 shadow-[0_0_40px_-8px_rgba(225,27,36,0.5)]"
            aria-hidden
          >
            <XCircle className="h-12 w-12 text-red-500 md:h-14 md:w-14" strokeWidth={1.75} />
          </div>

          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-400 md:text-base"
            role="status"
          >
            Error
          </p>

          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl md:leading-tight">
            Payment could not be completed
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-normal text-white/90 md:text-2xl md:leading-normal">
            Network or gateway error. Try
            again or contact us at{" "}
            <a
              className="font-semibold text-[#e11b24] underline decoration-red-500/40 underline-offset-2"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>{" "}
            if it persists.
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/checkout"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#e11b24] px-8 text-lg font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-700"
            >
              Try checkout again
            </Link>
            <Link
              href="/cart"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-white/25 bg-transparent px-8 text-lg font-medium text-white transition hover:border-white/45 hover:bg-white/5"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
