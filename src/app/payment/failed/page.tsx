import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { contact } from "@/lib/contact";

export const metadata = {
  title: "Payment could not be completed",
};

export default function PaymentFailedPage() {
  return (
    <div>
      <PageHeader
        title="Payment could not be completed"
        description="We could not complete your payment. No money was taken. You can return to the cart, try checkout again, or contact us for help."
        breadcrumb={[
          { href: "/checkout", label: "Checkout" },
          { label: "Payment" },
        ]}
      />
      <div className="mx-auto max-w-lg px-4 py-12 text-center md:px-6">
        <p className="text-white/80">
          If it keeps happening, email{" "}
          <a
            className="text-[#e11b24] underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>{" "}
          with the time you tried to pay, and we will help you place your
          order.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/cart"
            className="rounded-md border border-white/30 px-5 py-2.5 text-sm text-white/90"
          >
            Back to cart
          </Link>
          <Link
            href="/checkout"
            className="rounded-md bg-[#e11b24] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try checkout again
          </Link>
        </div>
      </div>
    </div>
  );
}
