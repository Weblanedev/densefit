import { PageHeader } from "@/components/page-header";
import { contact } from "@/lib/contact";

export const metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy policy"
        description="How we handle your data at Densefit."
        breadcrumb={[{ label: "Privacy" }]}
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-relaxed text-white/85 md:px-6">
        <p>
          We collect the information you provide at checkout and when you
          contact us, such as your name, email, phone, and delivery address.
          This is used to process orders, send updates, and support you.
        </p>
        <p>
          We do not sell your personal data. We may use service providers
          (hosting, email) that process data on our instructions and under
          appropriate safeguards.
        </p>
        <p>
          Newsletters, if you opt in, are sent only to the address you
          provide. You can ask to be removed at any time by writing to{" "}
          <a
            className="text-[#e11b24] underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          .
        </p>
        <p>
          We use cookies and similar technology as required for the site to
          function, including cart storage in your browser. You can control
          cookies through your browser settings.
        </p>
      </div>
    </div>
  );
}
