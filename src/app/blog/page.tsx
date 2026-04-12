import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { StaticNavbar } from "@/components/layout/StaticNavbar"

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
  title: "Blog | Consejos para el cuidado de tu perro",
  description:
    "Artículos sobre higiene, baño y peluquería canina. Consejos prácticos de los expertos de Washdog Ñuñoa.",
  alternates: { canonical: "https://washdog.cl/blog" }
}

const categoryColors: Record<string, string> = {
  Baño:       "bg-accent-blue/10 text-accent-blue",
  Cuidado:    "bg-accent-green/30 text-accent-green-dark",
  Peluquería: "bg-accent-peach/20 text-accent-peach-dark",
  Salud:      "bg-accent-peach/20 text-accent-peach-dark",
  Local:      "bg-accent-green/30 text-accent-green-dark",
  Gatos:      "bg-accent-purple/30 text-accent-purple-dark",
}

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? "1", 10))
  const allPosts    = getAllPosts()
  const totalPages  = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const safePage    = Math.min(currentPage, totalPages || 1)
  const posts       = allPosts.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE)

  return (
    <>
      <StaticNavbar />
      <main className='min-h-screen bg-background pt-20'>
        {/* Header */}
        <section className='py-20 bg-white border-b border-primary/5'>
          <div className='max-w-7xl mx-auto px-6 text-center'>
            <span className='text-xs font-bold uppercase tracking-[0.25em] text-accent-blue mb-3 block'>
              Washdog Blog
            </span>
            <h1 className='text-4xl md:text-5xl font-semibold text-primary mb-4 tracking-tight'>
              Consejos para tu perro
            </h1>
            <p className='text-primary/50 max-w-xl mx-auto font-light text-lg'>
              Todo lo que necesitas saber sobre higiene, baño y cuidado canino.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className='py-16'>
          <div className='max-w-7xl mx-auto px-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className='card-hover group bg-white border border-primary/8 rounded-5xl p-8 flex flex-col gap-4 hover:border-accent-blue/40 hover:shadow-xl hover:shadow-accent-blue/8 transition-all'
                >
                  <div className='flex items-center justify-between'>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg ${categoryColors[post.category] ?? "bg-primary/10 text-primary/60"}`}
                    >
                      {post.category}
                    </span>
                    <span className='text-[10px] text-primary/40 font-medium uppercase tracking-widest'>
                      {post.readTime} lectura
                    </span>
                  </div>

                  <h2 className='text-xl font-semibold text-primary tracking-tight leading-snug group-hover:text-accent-blue transition-colors'>
                    {post.title}
                  </h2>

                  <p className='text-primary/60 text-sm font-light leading-relaxed flex-grow'>
                    {post.description}
                  </p>

                  <div className='flex items-center justify-between pt-2 border-t border-primary/5'>
                    <div className='flex flex-col gap-0.5'>
                      <span className='text-[11px] text-primary/40'>
                        {new Date(post.date).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                      {post.author && (
                        <span className='text-[11px] text-primary/40'>
                          Por <span className='text-accent-blue'>{post.author}</span>
                        </span>
                      )}
                    </div>
                    <span className='text-xs font-medium text-accent-blue group-hover:translate-x-1 transition-transform inline-block'>
                      Leer →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 mt-14'>
                {safePage > 1 && (
                  <Link
                    href={safePage === 2 ? "/blog" : `/blog?page=${safePage - 1}`}
                    className='px-4 py-2 text-sm font-medium text-primary/60 hover:text-accent-blue transition-colors'
                  >
                    ← Anterior
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Link
                    key={p}
                    href={p === 1 ? "/blog" : `/blog?page=${p}`}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                      p === safePage
                        ? "bg-primary text-white shadow-md"
                        : "text-primary/50 hover:text-accent-blue hover:bg-accent-blue/10"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {safePage < totalPages && (
                  <Link
                    href={`/blog?page=${safePage + 1}`}
                    className='px-4 py-2 text-sm font-medium text-primary/60 hover:text-accent-blue transition-colors'
                  >
                    Siguiente →
                  </Link>
                )}
              </div>
            )}
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
