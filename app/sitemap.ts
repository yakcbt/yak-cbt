import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yak-cbt.vercel.app";

  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/pst`, priority: 0.9 },
    { url: `${baseUrl}/fpff`, priority: 0.9 },
    { url: `${baseUrl}/pssr`, priority: 0.9 },
    { url: `${baseUrl}/efa`, priority: 0.9 },
    { url: `${baseUrl}/stsdsd`, priority: 0.9 },
  ];
}