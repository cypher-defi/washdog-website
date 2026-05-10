import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPost } from "@/lib/blog"
import { getAllIssues } from "@/lib/newsletter"
import { BlogPostClient } from "./BlogPostClient"

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
    alternates: { canonical: `https://www.washdog.cl/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.washdog.cl/blog/${slug}`,
      locale: "es_CL",
      type: "article",
      publishedTime: post.date,
      siteName: "Washdog",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return <BlogPostClient post={post} newsletterIssues={getAllIssues()} />
}
