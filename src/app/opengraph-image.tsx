import { ogAlt, ogSize, renderOgImage } from "@/lib/og/renderOgImage";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderOgImage();
}
