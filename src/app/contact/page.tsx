"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/page-header";
import { contact } from "@/lib/contact";

export default function ContactPage() {
  const [msg, setMsg] = useState("");

  return (
    <div>
      <PageHeader
        title="Contact"
        description="We reply by email, usually within one to two business days."
        breadcrumb={[{ label: "Contact" }]}
      />
      <div className="mx-auto max-w-lg px-4 py-10 md:px-6">
        <p className="mb-6 text-white/80">
          Email us directly at{" "}
          <a
            className="text-[#e11b24] underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (msg.trim().length < 5) {
              toast.error("Please enter a short message");
              return;
            }
            toast.success("Message sent. We will reply by email.");
            setMsg("");
          }}
        >
          <label className="mb-1 block text-sm text-white/80" htmlFor="m">
            Message
          </label>
          <textarea
            id="m"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-white/20 bg-zinc-900 px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#e11b24]"
            placeholder="Order number, product, or question"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-[#e11b24] py-2.5 text-sm font-semibold text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
