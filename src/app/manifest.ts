import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GSM A/C General & Contractor Inc",
    short_name: "GSM AC",
    description:
      "Professional HVAC services in Cypress, TX. Air conditioning, heating, duct cleaning, and insulation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1a",
    theme_color: "#0a0f1a",
    icons: [
      {
        src: "/logo.avif",
        sizes: "192x192",
        type: "image/avif",
        purpose: "maskable",
      },
      {
        src: "/logo.avif",
        sizes: "512x512",
        type: "image/avif",
        purpose: "maskable",
      },
    ],
  };
}
