import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GSM A/C & General Contractor Inc - HVAC Services in Texas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #1f2937 50%, #0a0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <img
          src="https://www.gsmactx.com/logo.avif"
          alt="GSM AC Logo"
          width={200}
          height={200}
          style={{
            marginBottom: 32,
          }}
        />

        {/* Company Name */}
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

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#818cf8",
            marginBottom: 24,
          }}
        >
          Professional HVAC Services
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          Cypress, TX | (281) 235-4684
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
