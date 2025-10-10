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
          "/create-campaign",
          "/edit-campaign",
          "/test-campaign",
          "/view-campaigns",
          "/login",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
