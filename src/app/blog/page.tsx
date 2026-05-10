import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { BlogClient } from "./BlogClient"

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
  title: "Blog | Consejos para el cuidado de tu perro",
  description:
    "Artículos sobre higiene, baño y peluquería canina. Consejos prácticos de los expertos de Washdog Ñuñoa.",
  alternates: { canonical: "https://www.washdog.cl/blog" }
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

  return <BlogClient posts={posts} totalPages={totalPages} safePage={safePage} />
}
