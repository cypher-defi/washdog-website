import { getPost } from "@/lib/blog"

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function BlogSlugLayout({ children, params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.washdog.cl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.washdog.cl/blog" },
      { "@type": "ListItem", position: 3, name: post?.title ?? "Artículo", item: `https://www.washdog.cl/blog/${slug}` }
    ]
  }

  const blogPostingSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Washdog",
      url: "https://www.washdog.cl",
    },
    publisher: {
      "@type": "Organization",
      name: "Washdog",
      url: "https://www.washdog.cl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.washdog.cl/hero-beagle.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.washdog.cl/blog/${slug}`,
    },
  } : null

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {blogPostingSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {children}
    </>
  )
}
