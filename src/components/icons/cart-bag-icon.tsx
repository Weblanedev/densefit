import { ShoppingCart } from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Brand shopping-cart icon (matches `app/icon.svg`). */
export function SiteCartIcon(props: LucideProps) {
  return <ShoppingCart aria-hidden={props["aria-label"] ? undefined : true} {...props} />;
}
