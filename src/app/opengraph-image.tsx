import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} online store for household and furniture`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Serves as og:image (WhatsApp, Facebook, LinkedIn) and is picked up by the metadata system.
 * Uses the same cart mark as the site `icon.svg`.
 */
export default async function OpengraphImage() {
  const svg = await readFile(
    join(process.cwd(), "src/app/icon.svg"),
    "utf8"
  );
  const src = `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #050505 0%, #141414 50%, #0a0a0a 100%)",
        }}
      >
        <img
          width={200}
          height={200}
          src={src}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            color: "#e11b24",
            fontSize: 80,
            fontWeight: 800,
            marginTop: 32,
            letterSpacing: "0.1em",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(241, 245, 249, 0.9)",
            fontSize: 28,
            marginTop: 20,
            maxWidth: 880,
            textAlign: "center" as const,
            lineHeight: 1.35,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          Household goods, home décor, and furniture. Nigeria-wide delivery.
        </div>
      </div>
    ),
    { ...size }
  );
}
