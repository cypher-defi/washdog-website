import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const contentDir = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"))
  return files
    .map(filename => {
      const slug = filename.replace(".md", "")
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8")
      const { data } = matter(raw)
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filepath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)
  const contentHtml = await marked(content)
  return { slug, contentHtml, ...data } as Post
}
