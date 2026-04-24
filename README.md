# Densefit

Online store for household products, home décor, furniture, kitchen, and groceries. Built with **Next.js 16**, **Tailwind CSS 4**, and **react-hot-toast**. Product data is loaded from a public product feed; prices show in NGN or USD as configured.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Copy `.env.local.example` to `.env.local` and set variables as needed. The header currency switch and `NEXT_PUBLIC_NGN_PER_USD` control how list prices are shown.

## Build spec

See `build.instruction.md` for implementation notes.
