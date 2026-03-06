import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPost } from "@/lib/blog"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://www.washdog.cl/blog/${slug}` }
  }
}

const categoryColors: Record<string, string> = {
  Baño:       "bg-accent-blue/10 text-accent-blue",
  Cuidado:    "bg-accent-green/30 text-accent-green-dark",
  Peluquería: "bg-accent-peach/20 text-accent-peach-dark",
  Salud:      "bg-accent-peach/20 text-accent-peach-dark",
  Local:      "bg-accent-green/30 text-accent-green-dark",
  Gatos:      "bg-accent-purple/30 text-accent-purple-dark",
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <LocalBusinessJsonLd />
      <StaticNavbar />
      <main className='min-h-screen bg-background pt-20'>
        {/* Header */}
        <section className='py-16 bg-white border-b border-primary/5'>
          <div className='max-w-3xl mx-auto px-6'>
            <Link
              href='/blog'
              className='text-accent-blue hover:underline text-sm mb-8 inline-flex items-center gap-1'
            >
              ← Volver al blog
            </Link>

            <div className='flex items-center gap-3 mt-6 mb-6'>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg ${categoryColors[post.category] ?? "bg-primary/10 text-primary/60"}`}
              >
                {post.category}
              </span>
              <span className='text-[10px] text-primary/40 font-medium uppercase tracking-widest'>
                {post.readTime} lectura
              </span>
              <span className='text-[10px] text-primary/40 font-medium'>
                {new Date(post.date).toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </div>

            <h1 className='text-3xl md:text-4xl font-semibold text-primary mb-4 tracking-tight leading-snug'>
              {post.title}
            </h1>
            <p className='text-primary/60 text-lg font-light leading-relaxed'>
              {post.description}
            </p>
          </div>
        </section>

        {/* Article content */}
        <section className='py-12'>
          <div className='max-w-3xl mx-auto px-6'>
            <div
              className='prose prose-lg max-w-none text-primary/80
                prose-headings:text-primary prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:pl-6 prose-li:mb-2 prose-li:font-light
                prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline'
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className='py-16 bg-white border-t border-primary/5'>
          <div className='max-w-2xl mx-auto px-6 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-3 tracking-tight'>
              ¿Listo para reservar?
            </h2>
            <p className='text-primary/60 mb-8 font-light'>
              Baño y peluquería canina en Ñuñoa. Abierto todos los días de 10 a 20h.
            </p>
            <Link
              href='/#servicios'
              className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-accent-blue transition-all tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:-translate-y-0.5'
            >
              Ver servicios y reservar
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
