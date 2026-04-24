import { PageHeader } from "@/components/page-header";
import { contact } from "@/lib/contact";
import { site } from "@/lib/site";

export const metadata = {
  title: "About us",
  description: `About ${site.shortName} and our household and furniture store in Nigeria.`,
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title={`About ${site.shortName}`}
        breadcrumb={[{ label: "About" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <p
          className="mb-6 text-2xl text-[#e11b24]"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Household and furniture, sold online
        </p>
        <p className="mb-4 text-white/85 leading-relaxed">
          {site.shortName} is an online store for household goods, home décor,
          furniture, and kitchen and pantry items. We work with suppliers to
          stock real products, list clear prices, and deliver orders across
          Nigeria. You can see prices in NGN or USD using the selector in the
          header.
        </p>
        <p className="mb-4 text-white/85 leading-relaxed">
          Customer service is by email. If you need help before or after you
          buy, we will respond as soon as we can.
        </p>
        <p className="text-white/85 leading-relaxed">
          Write to us at{" "}
          <a
            className="text-[#e11b24] underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
