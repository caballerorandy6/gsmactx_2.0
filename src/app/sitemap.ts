import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

interface SitemapConfig {
  baseUrl: string;
  dynamicRoutes: string[];
}

/**
 * Sitemap configuration
 *
 * @property {string} url - The base URL of the site.
 * @property {string[]} dynamicRoutes - The dynamic routes of the site.
 *
 */
const sitemapConfig: SitemapConfig = {
  baseUrl: "https://www.gsmactx.com",
  dynamicRoutes: [
    "/air-conditioning-installation",
    "/air-conditioning-repair",
    "/heating-installation",
    "/heating-repair",
    "/air-duct-sanitizing",
    "/attic-insulation",
  ],
};

const getFiles = async (
  dir: string,
  extensions: string[]
): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.parentPath.includes("(.")) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await getFiles(fullPath, extensions);
      files.push(...nestedFiles);
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
};

const getBasePath = async (): Promise<string> => {
  const srcAppPath = path.join(process.cwd(), "src/app");
  const appPath = path.join(process.cwd(), "app");
  try {
    await fs.access(srcAppPath);
    return srcAppPath;
  } catch {
    return appPath;
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const extensions = [".tsx", ".jsx", ".mdx"];
  const basePath = await getBasePath();
  const pages = await getFiles(basePath, extensions);
  const { baseUrl, dynamicRoutes } = sitemapConfig;

  const routes = await Promise.all(
    pages
      .filter((filePath) => /page\.(tsx|jsx|mdx)$/.test(filePath))
      .map(async (filePath) => {
        const relativePath = path.relative(basePath, path.dirname(filePath));
        const route =
          relativePath === ""
            ? "/"
            : `/${relativePath
                .replace(/\\/g, "/")
                .replace(/\([^\/]+\)/g, "")
                .replace(/\/\/+/g, "/")
                .replace(/^\/|\/$/g, "")}`;

        return route;
      })
  );

  return [...routes, ...dynamicRoutes]
    .filter((route) => !route.includes("["))
    .filter((route) => !route.includes("@"))
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    }));
}
