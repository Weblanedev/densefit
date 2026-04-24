# DENSEFIT — E-commerce build & handoff spec

This document is the **source of truth** for rebuilding **Densefit** as a new, **elegant** storefront while preserving **brand colors**, **Nigerian (NGN) positioning**, and the **content themes** of the current site. It is written so an AI or team can implement the app **from scratch** (or align an existing Next.js app) with **Next.js (App Router)**, **Tailwind CSS**, and **react-hot-toast**.

**Reference (legacy) site to match in spirit, not line-for-line code:**

| Page                                                                         | URL                                                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Home                                                                         | [https://densefitshop.netlify.app/](https://densefitshop.netlify.app/)                               |
| Best selling / home category emphasis                                        | [https://densefitshop.netlify.app/bestsellinghome](https://densefitshop.netlify.app/bestsellinghome) |
| Shipment / delivery info (equivalent in new app: dedicated route or section) | [https://densefitshop.netlify.app/shipment](https://densefitshop.netlify.app/shipment)               |
| About                                                                        | [https://densefitshop.netlify.app/about](https://densefitshop.netlify.app/about)                     |

**Reference screenshots (workspace):** use these for layout/section parity and mood when building UI (paths under the Cursor project; copy into `public/` as needed):

- `assets/image-fe8c18db-d513-4ea6-a73b-1ebdf6ed616e.png` — hero, header, cart badge, NGN, carousel dots, CTA.
- `assets/image-019e27bd-45b4-4d90-ab9b-aa9937662b8d.png` — “Why trust us?”, “Best selling” intro, product row with badges.
- `assets/image-f1d02871-22d5-4a5d-88ca-790e23e35811.png` — product grid, promo banners, dark theme.
- `assets/image-b0875111-0a69-43fa-8aac-e3de91e54f42.png` — newsletter + footer (Densefit about copy, contact, Terms).
- `assets/image-1884659a-74f4-4571-acef-5e59ee857763.png` — Terms hero + legal content area.

---

## 1. Product & positioning (read first)

- **Brand:** **DENSEFIT** / **Densefit** (use consistently: logo = uppercase; body copy can use sentence case “Densefit”).
- **Vertical:** **home needs and furniture** only. Replace legacy copy about beauty, wine, or unrelated categories with **household, décor, and furniture** language. The **structure** of the old site (hero, trust, best sellers, grids, promos, newsletter, footer) stays; **subjects in images and copy** must read as **home & furniture** for the new build.
- **Tone:** professional, trustworthy e-commerce. Do **not** label the store “demo” or “sample” in user-visible UI.
- **Currency:** default **NGN (₦)** with a **currency selector** in the header (e.g. NGN; structure for more codes later if needed). Format prices with `Intl` for `en-NG` or equivalent.
- **Out of scope (do not build):** **Partner with us**, **affiliate** programs, **reseller** portals, or any B2B partner onboarding flows. No duplicate “affiliate” nav items.

---

## 2. One-page technical summary

| Area              | Spec                                                                                                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | **Next.js** (App Router) + **React** + **TypeScript**                                                                                                                                                                                                                                             |
| **Styling**       | **Tailwind CSS** (v3 or v4 per project)                                                                                                                                                                                                                                                           |
| **Toasts**        | **react-hot-toast** (global provider in root layout)                                                                                                                                                                                                                                              |
| **Catalog**       | Start with **static JSON** or a **public product API** (e.g. DummyJSON categories mapped to `home-decoration` / `furniture` / `groceries` only as needed for _home_ — **tune categories to home & furniture**). Prefer a single `StoreProduct` type and server/client fetch pattern with caching. |
| **Cart**          | **React Context** + **localStorage** persistence; cart icon + badge count in header (match legacy: badge e.g. item count or distinct SKU count).                                                                                                                                                  |
| **Auth**          | Optional for v1: if checkout requires login, gate it explicitly in spec: **recommend** email/password with httpOnly session cookie, or **guest checkout** with email on checkout only. Choose one and document; do not block catalog browsing.                                                    |
| **Checkout**      | Full **address + order summary** UI; **payment** is a **stub** (see section 8).                                                                                                                                                                                                                   |
| **Legal**         | Terms & Conditions, Privacy (and Returns if present on marketing site) as routes with readable typography.                                                                                                                                                                                        |
| **Notifications** | **react-hot-toast** for: add to cart, form success/error, and **payment flow** (loading → failed).                                                                                                                                                                                                |

**Node:** `>= 20` LTS recommended.

---

## 3. Brand & design system (elegant, faithful to old site)

**Colors (from legacy UI — keep these as tokens in Tailwind config or `globals.css`):**

- **Background:** near-black `#000000` and charcoal `#1a1a1a` / `#2d2e32` (footer / panels).
- **Primary accent (red):** vibrant red for logo wordmark, key headings, active carousel dot, primary buttons, and badges. Target approx. **`#E11B24`** range (tune in theme to pass contrast on white and on dark).
- **Text:** **white** on dark sections; on light legal body areas use **black / dark gray** for body (see Terms reference).
- **CTAs:** white pill buttons with dark text/icons on hero; red solid for “Notify me” style actions.

**Typography:**

- **Display / marketing headlines:** high-contrast — either refined **serif** for elegance or a **strong sans**; legacy used script for some accents; **optional** one script font for a single line (e.g. “Shop now”) if it stays legible. Prefer **one** display approach site-wide.
- **UI and body:** clean sans (e.g. **Inter**, **Geist**, or **DM Sans**). Avoid clutter; generous spacing.

**Layout patterns (must exist on home):**

1. **Header:** logo (red) left; **cart** (with count badge) + **currency (NGN)** right; optional compact nav for **Shop**, **About**, **Shipment** / **Delivery**, **Contact** as text links for the new app (old site was very minimal in header).
2. **Hero:** full-bleed lifestyle image, dark overlay, **headline** + **subcopy** (home & furniture), **primary CTA** (e.g. “Shop now”), **carousel indicators** (dots) if multiple hero slides; keyboard-friendly.
3. **Trust strip / “Why trust us?”** — four items in a row on desktop, stack on mobile: e.g. Secured payment, Eco-friendly, Fast delivery, Fair pricing / discounts. Icon + short label; dark or image background with overlay; white text.
4. **“Best selling” (or “Popular picks”)** — section title with accent line; horizontal scroll or grid of product cards; badges: **New**, **Sale**, **% off** where relevant.
5. **Product grid** — cards: image, badge, **Add to cart** (white button, dark border/text), **category** (small red uppercase), **title**, **₦ price**; center-aligned per legacy.
6. **Promo banners** — two (or more) large tiles with background image, headline offer (e.g. “10% off”), subtext; rounded corners; responsive stack.
7. **Newsletter** — full-width band with background image, heading “Get notification about the special offers”, subline, email field, red **“Notify me”** button; toasts on success/validation.
8. **Footer** — three columns: **About Densefit** (paragraph aligned to business below), **Contact**, **Terms & Condition** link; **Densefit** / section headers in **red** on dark gray background.

**About copy (footer / about page — paraphrase as needed, keep meaning):** Densefit is an online shopping platform for **household and home** products; deals, flash sales, campaigns; **genuine** products, **secure** payments, **doorstep** delivery, **returns**; customer satisfaction.

**Contact:** `info@densefit.com` (or keep consistent with a single `src/lib/site.ts` / `contact.ts` module).

**Micro-interactions:** subtle hover on cards; focus rings for accessibility; toasts for cart and payment states.

---

## 4. Routes (App Router) — required map

| Route                      | Purpose                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                        | Home: sections above.                                                                                                                                             |
| `/products`                | Product listing, filters/categories: **home needs**, **furniture** (or similar labels).                                                                           |
| `/products/[id]`           | Product detail, add to cart, related items optional.                                                                                                              |
| `/cart`                    | Cart view, proceed to checkout.                                                                                                                                   |
| `/checkout`                | Shipping/contact form + order summary + **Pay** (stub).                                                                                                           |
| `/payment/failed`          | **Result page after failed payment** (primary destination for the stub; see below).                                                                               |
| `/about`                   | Company story, mission, NGN/region — aligned with [about](https://densefitshop.netlify.app/about) content themes.                                                 |
| `/shipment` or `/delivery` | Shipping & delivery information (from [shipment](https://densefitshop.netlify.app/shipment) themes: timelines, areas, care — use real-sounding copy for Nigeria). |
| `/terms`                   | Terms & conditions (from legacy structure: title hero + breadcrumb + body).                                                                                       |
| `/privacy`                 | Privacy policy.                                                                                                                                                   |
| `not-found`                | Friendly 404.                                                                                                                                                     |

**Breadcrumbs** on inner pages: `Home` > `Current page` (match Terms reference style).

**Do not add:** `/partners`, `/affiliate`, `/reseller` unless the product owner explicitly changes this spec.

---

## 5. Data model (catalog)

Define a `StoreProduct` type approximately:

- `id`, `slug`, `name`, `description`, `price`, `salePrice?`, `currency: 'NGN'`, `images[]`, `category` (e.g. `home-care` / `furniture`), `badges?` (`'new' | 'sale' | 'off'` + optional percent).

Seed **12–30** products that **visually and verbally** fit **home & furniture** (use licensed or stock URLs in `next.config` `images.remotePatterns`).

---

## 6. Cart & pricing rules

- Persist cart in **localStorage**; sync on load; badge = total **quantity** or line count (document choice in code).
- All prices in **₦**; use `formatPrice(amountNgn)`.
- Shipping line item: **flat** or **free over threshold** — document the constant in one module.

---

## 7. Checkout UX

- Form: name, email, phone, address fields suitable for **Nigeria** (e.g. state, city, full address as needed).
- Order summary: line items, subtotal, shipping, **total** in NGN.
- **No** real charge in v1.

---

## 8. Payment (stub + future Kora / Korapay)

**Current requirement:** Implement a **complete UI flow** that **simulates** initiating payment, then **always** ends in a **failed** result for now.

1. On “Pay” / “Complete order”: show **loading** state (and optionally a toast: “Processing payment…”).
2. After a short delay, **do not** call a real gateway. Navigate or redirect to **`/payment/failed`** (or show failure inline **and** offer link to the failed page).
3. On **`/payment/failed`:** clear message (e.g. “Payment could not be completed.”), CTA to **return to cart** or **try again** (back to checkout), support link.

**Future integration (Korapay):** add a **single** module, e.g. `src/lib/payments/korapay.ts` (or `lib/payment-gateway.ts`) with **TODO** stubs:

- `initPayment({ orderId, amount, currency, customer, callbackUrl })`
- `verifyWebhook` / `handleCallback` (documented but not implemented)

Environment variables to reserve (names illustrative — align with [Korapay](https://korapay.com) docs when implementing):

- `KORAPAY_SECRET_KEY` (server only)
- `KORAPAY_PUBLIC_KEY` (if client needs it)
- `PAYMENT_CALLBACK_URL`

The **build must not** embed real keys; use `.env.local.example` with placeholders. Wire **real** API calls only when the owner adds keys and approves a follow-up spec.

**User-facing copy:** do not mention “Korapay” until integrated; the stub can say “Payment service” or “We couldn’t process your payment.”

---

## 9. `react-hot-toast` (mandatory)

- Global `<Toaster />` in `app/layout.tsx` (position `top-right` or `bottom-center`; one consistent choice).
- Use for: add/remove cart, newsletter submit, checkout validation errors, **payment processing** and **payment failed** (optional duplicate with dedicated page).
- **Do not** use `alert()`.

---

## 10. Environment variables (example)

| Variable                                      | Purpose                                             |
| --------------------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_NAME`                       | `Densefit`                                          |
| `NEXT_PUBLIC_SITE_URL`                        | Production URL when deployed                        |
| `NEXT_PUBLIC_DEFAULT_CURRENCY`                | `NGN`                                               |
| `CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_EMAIL` | `info@densefit.com`                                 |
| `SESSION_SECRET`                              | If auth is added (required for production sessions) |
| _Future_                                      | `KORAPAY_*` as above                                |

---

## 11. Project structure (suggested)

```
src/
  app/
    layout.tsx          # fonts, Toaster, layout shell
    page.tsx
    products/
    cart/
    checkout/
    payment/failed/
    about/
    shipment/           # or delivery/
    terms/
    privacy/
    not-found.tsx
  components/           # Header, Hero, TrustSection, ProductCard, Footer, etc.
  lib/
    site.ts
    contact.ts
    products.ts
    format-price.ts
    payment-stub.ts     # now; evolve to Korapay
  context/
    cart-context.tsx
  data/
    products.json       # or fetch from API
public/
  images/               # local marketing assets
```

`next.config`: **images.remotePatterns** for any remote product/hero image hosts.

---

## 12. SEO, accessibility, performance

- Unique `metadata` (title/description) per route; `metadataBase` for Open Graph.
- One **h1** per page; product pages: meaningful titles.
- Color contrast: red on white and white on dark must meet **WCAG** for body UI text where possible.
- `next/image` with `sizes` for responsive images; lazy-load below fold.

---

## 13. Mobile responsiveness

- Breakpoints: Tailwind `sm` / `md` / `lg`.
- Trust section: 4 → 2 → 1 columns.
- Product grid: 1 col mobile, 2–4 cols as width increases.
- Header: hamburger or compact nav on small screens if you add more links; touch targets ≥ 44px.
- Avoid iOS input zoom: `text-base` on inputs.

---

## 14. Rebrand / implementation checklist (for the AI or dev)

- [ ] Tailwind theme: black, charcoal, red, white (section 3).
- [ ] NGN + cart badge in header; no affiliate/partner routes.
- [ ] Home sections: hero, trust, best selling, grid, promos, newsletter, footer.
- [ ] `/about`, `/shipment` (or `/delivery`) with real-use copy for **home & furniture** and Nigeria.
- [ ] Cart + checkout + **payment stub** + **`/payment/failed`**.
- [ ] `react-hot-toast` on key actions.
- [ ] `contact.ts` (or `site.ts`) as single source for `info@densefit.com` and business blurb.
- [ ] `lib/payment` stub with comments for **future Korapay** env vars and functions.
- [ ] Terms + privacy pages; footer links.
- [ ] `README.md`: how to run, env copy, and pointer to this file (optional: keep README minimal).

---

## 15. What success looks like

A shopper can: browse **home & furniture** products, add to cart, see NGN prices, go through checkout, hit **Pay**, and land on a **polished failed payment** experience with toasts, **without** partner/affiliate features. The visual language feels **more refined** than the Netlify site but **clearly the same brand** (red, dark, white, Densefit copy themes). A later pass can **swap the stub** for **Korapay** using the reserved module and env pattern.

This document replaces prior specs from other codebases. Build **Densefit** against this file and the **reference URLs + screenshots** above.
