import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/blog"
import { getAllIssues } from "@/lib/newsletter"

const baseUrl = "https://www.washdog.cl"

function getServicePages(): { slug: string; lastModified: Date }[] {
  try {
    const dir = path.join(process.cwd(), "content", "servicios")
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(f => ({
        slug: f.replace(".md", ""),
        lastModified: fs.statSync(path.join(dir, f)).mtime,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug))
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Service pages — lastModified from actual .md file mtime, not build time
  const servicePages = getServicePages().map(({ slug, lastModified }) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const staticServicePages = [
    "/servicios/bano",
    "/servicios/corte",
    "/servicios/peluqueria-canina-nunoa",
    "/servicios/peluqueria-gatos-nunoa",
    "/servicios/auto-lavado-perros-nunoa",
    "/servicios/precio-peluqueria-nunoa",
  ].map(url => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const newsletterIssues = getAllIssues().map(issue => ({
    url: `${baseUrl}/newsletter/${issue.slug}`,
    lastModified: new Date(issue.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  // Note: /privacy and /terms are excluded — noindex pages should not appear in sitemaps
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...staticServicePages,
    ...servicePages,
    ...blogPosts,
    ...newsletterIssues,
  ]
}
