import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const contentDir = path.join(process.cwd(), "content/servicios")

export interface Commune {
  name: string
  slug: string
}

export interface RelatedService {
  href: string
  label: string
}

export interface ServicioMeta {
  slug: string
  title: string
  description: string
  communes?: Commune[]
  relatedServices?: RelatedService[]
}

export interface Servicio extends ServicioMeta {
  contentHtml: string
}

export function getAllServicios(): ServicioMeta[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"))
  return files.map(filename => {
    const slug = filename.replace(".md", "")
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8")
    const { data } = matter(raw)
    return { slug, ...data } as ServicioMeta
  })
}

export async function getServicio(slug: string): Promise<Servicio | null> {
  const filepath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)
  const contentHtml = await marked(content)
  return { slug, contentHtml, ...data } as Servicio
}
