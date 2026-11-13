import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "GSM A/C & General Contractor Inc - HVAC Services in Texas";

/**
 * Shared Open Graph / Twitter card renderer.
 * next/og (Satori) cannot decode AVIF, so the logo is embedded as a PNG data URL.
 */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), "src/lib/og/logo-og.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0a0f1a 0%, #1f2937 50%, #0a0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="GSM AC Logo"
          width={220}
          height={211}
          style={{ marginBottom: 32 }}
        />
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          GSM A/C & General Contractor Inc
        </div>
        <div style={{ fontSize: 28, color: "#7fbeff", marginBottom: 24 }}>
          Professional HVAC Services
        </div>
        <div style={{ fontSize: 22, color: "#9ca3af" }}>
          Cypress, TX | (281) 235-4684
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
