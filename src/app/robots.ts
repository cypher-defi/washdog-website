import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/", "/privacy", "/terms"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/privacy", "/terms"] },
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: [
      "https://www.washdog.cl/sitemap.xml",
      "https://www.washdog.cl/sitemap-local.xml",
    ]
  }
}
