import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata = {
  title: "Returns and refunds",
  description: `How returns and refunds work for orders on ${site.shortName}.`,
};

export default function ReturnsPage() {
  return (
    <div>
      <PageHeader
        title="Returns and refunds"
        description="How to return items and request a refund for orders placed on our store."
        breadcrumb={[{ label: "Returns" }]}
      />
      <div className="bg-zinc-100 py-10 text-zinc-900 md:py-12">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-relaxed md:px-6">
          <section>
            <h2
              className="mb-1 text-2xl text-[#e11b24]"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Returns
            </h2>
            <h3 className="mb-3 text-base font-bold text-zinc-900">
              Returns and refunds
            </h3>
            <p>
              {site.shortName} wants you to be satisfied with your purchase.
              This policy describes how returns and refunds work for orders
              placed through our website.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">
              Eligible items
            </h3>
            <p>
              Eligible items may be returned when they are unused, in original
              packaging where applicable, and returned within the window stated
              at the time of purchase. Some products may be non-returnable when
              opened for hygiene, software licensing, or safety reasons. We
              will confirm details for your order if that applies.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">
              How to start a return
            </h3>
            <p>
              Contact us using the email on our{" "}
              <Link
                className="font-medium text-[#e11b24] underline decoration-red-300/50 underline-offset-2"
                href="/contact"
              >
                Contact
              </Link>{" "}
              page with your order reference and a short description of the
              issue. We will provide return instructions and the correct return
              address.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">Refunds</h3>
            <p>
              After we receive and inspect the return, approved refunds are
              processed to the original payment method when possible. Timing
              may depend on your bank or card issuer.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">
              Shipping costs
            </h3>
            <p>
              Unless the return is due to our error or a defective item we
              accept under this policy, shipping costs for the return may be
              your responsibility. We will state this clearly before you send
              items back.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">
              Damaged or incorrect items
            </h3>
            <p>
              If your order arrives damaged or does not match what you
              purchased, contact us right away with photos if possible. We will
              work with you on a replacement or refund as appropriate.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-bold text-zinc-900">Questions</h3>
            <p>
              If anything in this policy is unclear, use our{" "}
              <Link
                className="font-medium text-[#e11b24] underline decoration-red-300/50 underline-offset-2"
                href="/contact"
              >
                Contact
              </Link>{" "}
              page and we will reply by email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
