import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.washdog.cl"

  const blogPosts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/servicios/bano`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/servicios/corte`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/servicios/peluqueria-canina-nunoa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/servicios/auto-lavado-perros-nunoa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/servicios/peluqueria-gatos-nunoa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/servicios/precio-peluqueria-nunoa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...blogPosts,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ]
}
