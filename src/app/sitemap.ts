import type { MetadataRoute } from "next";
import { allServices, businessInfo } from "@/lib/data";

/**
 * Only public, indexable pages. Built from allServices so a new service
 * shows up here automatically; admin, auth and unsubscribe pages never do.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = businessInfo.website;

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/book-appointment", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    ...allServices.map((service) => ({
      path: service.href,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
