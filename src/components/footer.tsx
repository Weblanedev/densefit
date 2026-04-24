import Link from "next/link";
import { SiteCartIcon } from "@/components/icons/cart-bag-icon";
import { contact } from "@/lib/contact";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#2d2e32]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-2 text-xl font-bold tracking-tight text-[#e11b24] transition hover:text-red-500"
          >
            <SiteCartIcon className="h-7 w-7 shrink-0" strokeWidth={2} />
            <span>{site.name}</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/80">
            {contact.aboutBlurb}
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#e11b24]">Contact</h3>
          <p className="text-sm text-white/80">
            <span className="font-medium text-white">Email:</span>{" "}
            <a
              className="underline decoration-white/30 underline-offset-2 hover:decoration-white"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#e11b24]">Legal</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link className="hover:text-white" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/returns">
                Returns and refunds
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
