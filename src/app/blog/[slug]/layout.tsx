import { getPost } from "@/lib/blog"

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Named author entity — improves E-E-A-T signals for Google's helpful content system
const WASHDOG_AUTHOR = {
  "@type": "Person",
  "@id": "https://washdog.cl/#jose-pablo",
  name: "José Pablo",
  jobTitle: "Fundador y Peluquero Canino",
  description: "Fundador de WashDog. Dueño de perros y residente de Ñuñoa. Abrió WashDog en febrero de 2026 para ofrecer una atención canina verdaderamente personalizada en Santiago.",
  url: "https://washdog.cl/equipo",
  worksFor: {
    "@type": "Organization",
    "@id": "https://washdog.cl",
    name: "Washdog",
    url: "https://washdog.cl",
  },
}

export default async function BlogSlugLayout({ children, params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://washdog.cl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://washdog.cl/blog" },
      { "@type": "ListItem", position: 3, name: post?.title ?? "Artículo", item: `https://washdog.cl/blog/${slug}` }
    ]
  }

  const blogPostingSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    image: {
      "@type": "ImageObject",
      url: "https://washdog.cl/hero-beagle.png",
      width: 1200,
      height: 630,
    },
    author: WASHDOG_AUTHOR,
    publisher: {
      "@type": "Organization",
      "@id": "https://washdog.cl",
      name: "Washdog",
      url: "https://washdog.cl",
      logo: {
        "@type": "ImageObject",
        url: "https://washdog.cl/washdog-social.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://washdog.cl/blog/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".prose p:first-of-type"],
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
