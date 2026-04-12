import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllIssues, getIssue } from "@/lib/newsletter"
import { StaticNavbar } from "@/components/layout/StaticNavbar"
import { StaticFooter } from "@/components/layout/StaticFooter"
import { NewsletterInline } from "@/components/sections/NewsletterInline"

interface Props {
  params: Promise<{ issue: string }>
}

export async function generateStaticParams() {
  return getAllIssues().map(i => ({ issue: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issue } = await params
  const data = await getIssue(issue)
  if (!data) return {}
  return {
    title: `${data.subject_line || data.title} | Santiago a Cuatro Patas`,
    description: data.description,
    alternates: { canonical: `https://washdog.cl/newsletter/${issue}` },
    openGraph: {
      title: data.subject_line || data.title,
      description: data.description,
      url: `https://washdog.cl/newsletter/${issue}`,
      locale: "es_CL",
      type: "article",
      publishedTime: data.date,
      siteName: "Santiago a Cuatro Patas — by Washdog",
    },
  }
}

export default async function NewsletterIssuePage({ params }: Props) {
  const { issue } = await params
  const data = await getIssue(issue)
  if (!data) notFound()

  const issues = getAllIssues()
  const currentIdx = issues.findIndex(i => i.slug === issue)
  const prevIssue  = issues[currentIdx + 1] ?? null
  const nextIssue  = issues[currentIdx - 1] ?? null

  return (
    <>
      <StaticNavbar />
      <main className="min-h-screen bg-background pt-20">

        {/* Header */}
        <section className="bg-primary py-14 px-6 text-center">
          <Link
            href="/newsletter"
            className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-yellow-400 mb-4 hover:text-yellow-300 transition-colors"
          >
            ← Santiago a Cuatro Patas
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2">
            {data.subject_line || data.title}
          </h1>
          <p className="text-white/50 text-sm font-light">
            Edición #{data.issue_number} · {data.commune} ·{" "}
            {new Date(data.date).toLocaleDateString("es-CL", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-2xl mx-auto px-6">
            <div
              className="prose prose-lg max-w-none text-primary/80
                prose-headings:text-primary prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:pl-6 prose-li:mb-2 prose-li:font-light
                prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-yellow-400 prose-blockquote:bg-yellow-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: data.contentHtml }}
            />

            {/* Newsletter signup */}
            <div className="mt-12 pt-10 border-t border-primary/8">
              <p className="text-primary/50 text-sm font-light text-center mb-4">
                ¿Quieres recibirla cada sábado?
              </p>
              <NewsletterInline />
            </div>

            {/* Prev / Next navigation */}
            <nav className="flex justify-between gap-4 mt-10 pt-8 border-t border-primary/8">
              {prevIssue ? (
                <Link
                  href={`/newsletter/${prevIssue.slug}`}
                  className="text-sm text-primary/50 hover:text-primary transition-colors"
                >
                  ← Edición #{prevIssue.issue_number}
                </Link>
              ) : <span />}
              {nextIssue ? (
                <Link
                  href={`/newsletter/${nextIssue.slug}`}
                  className="text-sm text-primary/50 hover:text-primary transition-colors"
                >
                  Edición #{nextIssue.issue_number} →
                </Link>
              ) : <span />}
            </nav>
          </div>
        </section>

      </main>
      <StaticFooter newsletterIssues={getAllIssues()} />
    </>
  )
}
