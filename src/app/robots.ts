import type { MetadataRoute } from "next";

const baseUrl: string = "https://www.gsmactx.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin-dashboard",
          "/appointments",
          "/create-appointment",
          "/edit-appointment",
          "/create-campaign",
          "/edit-campaign",
          "/test-campaign",
          "/view-campaigns",
          "/login",
          "/unsubscribe",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
