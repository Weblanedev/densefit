import { PageHero } from "@/components/page-header";
import { TermsBodyContent } from "./body-content";

export const metadata = {
  title: "Terms of Service",
  description:
    "Densefit terms and conditions, marketplace, returns, payments, and store credit.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms & Conditions"
        image="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80"
        breadcrumb={[
          { href: "/", label: "Home" },
          { label: "T & C" },
        ]}
      />
      <div className="bg-zinc-100 py-10 text-zinc-900 md:py-12">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <TermsBodyContent />
        </div>
      </div>
    </div>
  );
}
