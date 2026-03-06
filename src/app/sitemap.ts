import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/blog"

const baseUrl = "https://www.washdog.cl"

function getLocalServiceSlugs(): string[] {
  try {
    const jsonPath = path.join(process.cwd(), "data", "local-pages.json")
    if (!fs.existsSync(jsonPath)) return []
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
    return data.slugs ?? []
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }))

  // Programmatic local service pages — maintained by Marketing OS generate_sitemap.py
  const localServicePages = getLocalServiceSlugs().map(slug => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }))

  // Note: /privacy and /terms are excluded — noindex pages should not appear in sitemaps
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...localServicePages,
    ...blogPosts,
  ]
}
