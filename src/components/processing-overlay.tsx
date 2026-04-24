"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  title?: string;
  subtitle?: string;
};

/**
 * Full-viewport overlay with an indeterminate circular spinner.
 * z-index above page content; use for payment and other blocking operations.
 */
export function ProcessingOverlay({
  open,
  title = "Processing",
  subtitle = "Please wait, do not close this page.",
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-busy="true"
      aria-labelledby="processing-overlay-title"
      aria-describedby="processing-overlay-desc"
    >
      <div className="flex max-w-sm flex-col items-center rounded-2xl border border-white/15 bg-[#1a1a1a] px-10 py-12 shadow-2xl ring-1 ring-white/10">
        <div
          className="h-14 w-14 rounded-full border-2 border-white/20 border-t-[#e11b24] animate-spin"
          aria-hidden
        />
        <h2
          id="processing-overlay-title"
          className="mt-8 text-center text-xl font-semibold text-white"
        >
          {title}
        </h2>
        <p
          id="processing-overlay-desc"
          className="mt-2 text-center text-sm text-white/65"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
