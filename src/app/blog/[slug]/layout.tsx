import { getPost } from "@/lib/blog"

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Named author entity — improves E-E-A-T signals for Google's helpful content system
const WASHDOG_AUTHOR = {
  "@type": "Person",
  "@id": "https://www.washdog.cl/#author",
  name: "Equipo WashDog",
  description: "Peluqueros caninos profesionales en Ñuñoa, Santiago, con experiencia en todas las razas.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.washdog.cl",
    name: "Washdog",
    url: "https://www.washdog.cl",
  },
  url: "https://www.washdog.cl",
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
    author: WASHDOG_AUTHOR,
    publisher: {
      "@type": "Organization",
      "@id": "https://www.washdog.cl",
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

  // HowTo schema for step-by-step "Cómo" articles
  const howToSchema = post?.howToSteps && post.howToSteps.length >= 2
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title,
        description: post.description,
        author: WASHDOG_AUTHOR,
        step: post.howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null

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
      {howToSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {children}
    </>
  )
}
