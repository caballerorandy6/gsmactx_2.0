import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt =
  "GSM A/C & General Contractor Inc technicians cleaning ducts in a Cypress, TX home";

async function asDataUrl(file: string, mime: string) {
  const bytes = await readFile(join(process.cwd(), "src/lib/og", file));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

/**
 * Shared Open Graph / Twitter card renderer.
 * next/og (Satori) cannot decode AVIF, so the logo and the team photo
 * (public/main-2400.avif, real crew on a job) are embedded as PNG/JPEG.
 */
export async function renderOgImage() {
  const [logoSrc, photoSrc] = await Promise.all([
    asDataUrl("logo-og.png", "image/png"),
    asDataUrl("team-og.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0f1a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 570,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={120}
            height={115}
            style={{ marginBottom: 36 }}
          />
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "white",
              marginBottom: 20,
            }}
          >
            GSM A/C & General Contractor Inc
          </div>
          <div style={{ fontSize: 28, color: "#7fbeff", marginBottom: 40 }}>
            Professional HVAC Services
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: "white" }}>
            (281) 235-4684
          </div>
          <div style={{ fontSize: 22, color: "#9ca3af", marginTop: 8 }}>
            Cypress, TX
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={630} height={630} />
      </div>
    ),
    { ...ogSize }
  );
}
