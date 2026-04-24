import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Delivery & shipping",
  description: "How we ship your Densefit order across Nigeria.",
};

export default function ShipmentPage() {
  return (
    <div>
      <PageHeader
        title="Delivery & shipping"
        description="We pack household goods with care. Timelines are typical and may change during high demand."
        breadcrumb={[{ label: "Delivery" }]}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-white/85 leading-relaxed md:px-6">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Coverage</h2>
          <p>
            We deliver to major cities in Nigeria, including Lagos, Abuja, Port
            Harcourt, Ibadan, and other locations supported by our couriers. At
            checkout, you will be able to add your state, city, and full address
            for routing.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Processing</h2>
          <p>
            Orders are typically processed within 1 to 2 business days after
            payment confirmation. Large furniture items may require a short
            schedule window; we will contact you on the number you provide if
            a delivery date needs to be agreed.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Fees</h2>
          <p>
            Shipping is charged as a single flat line at checkout. The amount
            shown uses the currency you selected in the site header. Remote
            areas may be contacted for adjusted quotes before the order is
            confirmed.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Returns</h2>
          <p>
            If an item arrives damaged or not as described, keep the
            packaging and contact us with your order number. We will guide you
            through a return or replacement in line with our terms.
          </p>
        </section>
      </div>
    </div>
  );
}
